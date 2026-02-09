"use client";

import { use, useEffect, useRef, useState } from "react";
import type Peer from "peerjs";
import type { MediaConnection } from "peerjs";

type RoomState =
  | "requesting" // Getting camera permission
  | "connecting" // Camera ready, connecting to PeerJS server
  | "waiting" // On PeerJS server, waiting for other user
  | "connected" // In call with peer
  | "error";

export default function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);

  // ── Refs ──────────────────────────────────────────────
  const streamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const callRef = useRef<MediaConnection | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  // ── State ─────────────────────────────────────────────
  const [state, setState] = useState<RoomState>("requesting");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [peerLeft, setPeerLeft] = useState(false);

  // ── Callback refs for video elements ──────────────────
  const localVideoRef = useRef<HTMLVideoElement>(null);
  function attachLocalVideo(el: HTMLVideoElement | null) {
    localVideoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  }

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  function attachRemoteVideo(el: HTMLVideoElement | null) {
    remoteVideoRef.current = el;
    if (el && remoteStreamRef.current) {
      el.srcObject = remoteStreamRef.current;
    }
  }

  // ── Main effect: camera → PeerJS → connection ────────
  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setState("error");
      setErrorMessage(
        "Your browser doesn't support video calls. Please use Chrome, Firefox, or Safari."
      );
      return;
    }

    let cancelled = false;

    // Attach call event listeners
    function setupCall(call: MediaConnection) {
      callRef.current = call;

      call.on("stream", (remoteStream: MediaStream) => {
        remoteStreamRef.current = remoteStream;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        setState("connected");
        setPeerLeft(false);
      });

      call.on("close", () => {
        remoteStreamRef.current = null;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
        callRef.current = null;
        setState("waiting");
        setPeerLeft(true);
      });

      call.on("error", () => {
        remoteStreamRef.current = null;
        callRef.current = null;
        setState("waiting");
      });
    }

    // Connect to PeerJS server as the "joiner" (random ID, then call host)
    function connectAsJoiner(
      PeerJS: typeof Peer,
      stream: MediaStream
    ) {
      const joinerPeer = new PeerJS({
        host: "0.peerjs.com",
        port: 443,
        path: "/",
        secure: true,
      });

      peerRef.current = joinerPeer;

      joinerPeer.on("open", () => {
        if (cancelled) return;
        const call = joinerPeer.call(roomId, stream);
        if (call) {
          setupCall(call);
        }
      });

      // Also answer calls (in case host re-calls us)
      joinerPeer.on("call", (call) => {
        if (cancelled) return;
        call.answer(stream);
        setupCall(call);
      });

      joinerPeer.on("error", (err: { type: string }) => {
        if (cancelled) return;
        if (err.type === "peer-unavailable") {
          // Host not ready yet — likely a race condition, go back to waiting
          setState("waiting");
        } else {
          setState("error");
          setErrorMessage(
            "Connection failed. Please refresh and try again."
          );
        }
      });
    }

    async function init() {
      // ── Step 1: Get camera ──
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: { echoCancellation: true, noiseSuppression: true },
        });
      } catch (err) {
        if (cancelled) return;
        setState("error");
        if (err instanceof DOMException) {
          switch (err.name) {
            case "NotAllowedError":
              setErrorMessage(
                "Camera/microphone access denied. Please allow permissions in your browser settings."
              );
              break;
            case "NotFoundError":
              setErrorMessage("No camera or microphone found.");
              break;
            case "NotReadableError":
              setErrorMessage(
                "Camera or microphone is already in use by another application."
              );
              break;
            default:
              setErrorMessage(err.message);
          }
        } else {
          setErrorMessage(
            "An unexpected error occurred accessing your camera."
          );
        }
        return;
      }

      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;
      setState("connecting");

      // ── Step 2: Load PeerJS (dynamic import for SSR safety) ──
      const { default: PeerJS } = await import("peerjs");
      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      // ── Step 3: Try to register as host (peer ID = roomId) ──
      const peer = new PeerJS(roomId, {
        host: "0.peerjs.com",
        port: 443,
        path: "/",
        secure: true,
      });

      peerRef.current = peer;

      peer.on("open", () => {
        if (cancelled) return;
        // We're the host — wait for incoming calls
        setState("waiting");
      });

      // Answer any incoming call
      peer.on("call", (call) => {
        if (cancelled) return;
        call.answer(stream);
        setupCall(call);
      });

      peer.on("error", (err: { type: string }) => {
        if (cancelled) return;

        if (err.type === "unavailable-id") {
          // Room ID already taken → someone is host → we're the joiner
          peer.destroy();
          connectAsJoiner(PeerJS, stream);
        } else {
          setState("error");
          setErrorMessage(
            "Connection failed. Please refresh and try again."
          );
        }
      });
    }

    init();

    return () => {
      cancelled = true;
      callRef.current?.close();
      peerRef.current?.destroy();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [roomId]);

  // ── Controls ──────────────────────────────────────────
  function toggleMute() {
    if (!streamRef.current) return;
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted((m) => !m);
  }

  function toggleCamera() {
    if (!streamRef.current) return;
    streamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraOff((c) => !c);
  }

  function leaveCall() {
    callRef.current?.close();
    peerRef.current?.destroy();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    window.location.href = "/";
  }

  // ── Derived booleans for cleaner JSX ──────────────────
  const showVideo =
    state === "connecting" ||
    state === "waiting" ||
    state === "connected";

  return (
    <div className="flex h-screen flex-col bg-[#111827]">
      {/* ── Top bar ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">MeetUp</span>
        </div>

        <div className="flex items-center gap-3">
          {state === "connected" && (
            <div className="flex items-center gap-1.5 rounded-md bg-green-500/20 px-2.5 py-1">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs text-green-300">Connected</span>
            </div>
          )}
          <div className="rounded-md bg-white/10 px-3 py-1 text-xs text-slate-300">
            Room: {roomId}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="relative flex min-h-0 flex-1 items-center justify-center p-4">
        {/* Requesting camera access */}
        {state === "requesting" && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-blue-primary" />
            <p className="text-sm text-slate-300">
              Requesting camera access...
            </p>
          </div>
        )}

        {/* Error state */}
        {state === "error" && (
          <div className="flex max-w-md flex-col items-center gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-sm text-red-300">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Video area */}
        {showVideo && (
          <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
            {/* Remote video — fills main area when connected */}
            {state === "connected" && (
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                <video
                  ref={attachRemoteVideo}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  Remote
                </div>
              </div>
            )}

            {/* Local video — large when alone, PiP corner when connected */}
            <div
              className={
                state === "connected"
                  ? "absolute bottom-4 right-4 z-10 aspect-video w-48 overflow-hidden rounded-xl border-2 border-white/20 bg-black shadow-lg"
                  : "relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black"
              }
            >
              <video
                ref={attachLocalVideo}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              {isCameraOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
                  </svg>
                </div>
              )}
              <div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
                You
              </div>
            </div>

            {/* Status overlays */}
            {state === "connecting" && (
              <div className="absolute left-1/2 top-6 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-black/70 px-4 py-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <p className="text-sm text-slate-300">
                  Connecting to server...
                </p>
              </div>
            )}

            {(state === "waiting" || (state === "connecting" && !peerLeft)) && state === "waiting" && (
              <div className="absolute left-1/2 top-6 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-black/70 px-4 py-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                <p className="text-sm text-slate-300">
                  {peerLeft
                    ? "Participant left the call"
                    : "Waiting for participant..."}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Bottom control bar ── */}
      {showVideo && (
        <footer className="flex shrink-0 items-center justify-center border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors ${
                isMuted
                  ? "bg-red-500/20 hover:bg-red-500/30"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.13 1.48-.35 2.17" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>

            {/* Camera On / Off */}
            <button
              onClick={toggleCamera}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors ${
                isCameraOff
                  ? "bg-red-500/20 hover:bg-red-500/30"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              title={isCameraOff ? "Turn camera on" : "Turn camera off"}
            >
              {isCameraOff ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              )}
            </button>

            {/* Leave call */}
            <button
              onClick={leaveCall}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700"
              title="Leave call"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                <line x1="23" y1="1" x2="1" y2="23" />
              </svg>
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
