"use client";

import { use, useEffect, useRef, useState } from "react";
import type Peer from "peerjs";
import type { MediaConnection } from "peerjs";
import { PEER_CONFIG, ICE_SERVERS } from "@/lib/peerConfig";
import { checkBrowserSupport, isValidRoomId } from "@/lib/browserCheck";

// ── Types ──────────────────────────────────────────────
type RoomState =
  | "requesting"
  | "connecting"
  | "waiting"
  | "connected"
  | "reconnecting"
  | "error";

const MAX_RECONNECT = 3;
const RECONNECT_DELAY = 2000;

// ── Component ──────────────────────────────────────────
export default function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);

  // ── Refs ─────────────────────────────────────────────
  const streamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const callRef = useRef<MediaConnection | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const roleRef = useRef<"host" | "joiner">("host");
  const PeerJSRef = useRef<typeof Peer | null>(null);
  const reconnectCountRef = useRef(0);

  // ── State ────────────────────────────────────────────
  const [state, setState] = useState<RoomState>("requesting");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [peerLeft, setPeerLeft] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  // ── Callback refs for video elements ─────────────────
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

  // ── Main effect ──────────────────────────────────────
  useEffect(() => {
    // Browser support check
    const { supported, message } = checkBrowserSupport();
    if (!supported) {
      setState("error");
      setErrorMessage(message);
      return;
    }

    // Validate room ID
    if (!isValidRoomId(roomId)) {
      setState("error");
      setErrorMessage(
        "Invalid meeting link. Please check the URL and try again."
      );
      return;
    }

    let cancelled = false;

    // ── Call setup helper ──────────────────────────────
    function setupCall(call: MediaConnection) {
      callRef.current = call;

      call.on("stream", (remoteStream: MediaStream) => {
        remoteStreamRef.current = remoteStream;
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        reconnectCountRef.current = 0;
        setReconnectAttempt(0);
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

    // ── Reconnection (only for genuine disconnects) ──
    function attemptReconnect() {
      if (cancelled) return;
      if (reconnectCountRef.current >= MAX_RECONNECT) {
        setState("error");
        setErrorMessage(
          "Connection lost after multiple attempts. Please refresh and try again."
        );
        return;
      }

      reconnectCountRef.current++;
      setReconnectAttempt(reconnectCountRef.current);
      setState("reconnecting");

      // Exponential backoff: 1s, 2s, 4s
      const delay =
        1000 * Math.pow(2, reconnectCountRef.current - 1);
      setTimeout(() => {
        const peer = peerRef.current;
        if (!cancelled && peer && peer.disconnected && !peer.destroyed) {
          peer.reconnect();
        }
      }, delay);
    }

    // Attach reconnection ONLY after a peer has successfully opened.
    // This prevents destroy() during the host→joiner handoff from
    // triggering the disconnected handler.
    function attachReconnection(peer: InstanceType<typeof Peer>) {
      peer.on("disconnected", () => {
        if (cancelled || peer.destroyed) return;
        attemptReconnect();
      });
    }

    // ── Joiner connection ─────────────────────────────
    function connectAsJoiner(
      PeerJS: typeof Peer,
      stream: MediaStream
    ) {
      roleRef.current = "joiner";
      const joinerPeer = new PeerJS({
        ...PEER_CONFIG,
        config: ICE_SERVERS,
      });

      peerRef.current = joinerPeer;

      joinerPeer.on("open", () => {
        if (cancelled) return;
        // Now that we're connected, enable reconnection
        attachReconnection(joinerPeer);
        const call = joinerPeer.call(roomId, stream);
        if (call) setupCall(call);
      });

      joinerPeer.on("call", (call) => {
        if (cancelled) return;
        call.answer(stream);
        setupCall(call);
      });

      joinerPeer.on("error", (err: { type: string }) => {
        if (cancelled) return;
        if (err.type === "peer-unavailable") {
          // Host not ready yet — wait, don't treat as fatal
          setState("waiting");
        } else {
          setState("error");
          setErrorMessage(
            "Connection failed. Check your internet connection and try again."
          );
        }
      });
    }

    // ── Init ──────────────────────────────────────────
    async function init() {
      // Step 1: Get camera
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
                "Camera access denied. Click the camera icon in your browser's address bar to allow access, then refresh."
              );
              break;
            case "NotFoundError":
              setErrorMessage(
                "No camera or microphone detected. Please connect a device and refresh."
              );
              break;
            case "NotReadableError":
              setErrorMessage(
                "Camera or microphone is in use by another application. Close it and refresh."
              );
              break;
            case "OverconstrainedError":
              setErrorMessage(
                "Camera doesn't support the requested resolution. Please try a different browser."
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

      // Step 2: Load PeerJS
      const { default: PeerJS } = await import("peerjs");
      PeerJSRef.current = PeerJS;
      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      // Step 3: Try to register as host (peer ID = roomId)
      roleRef.current = "host";
      const peer = new PeerJS(roomId, {
        ...PEER_CONFIG,
        config: ICE_SERVERS,
      });

      peerRef.current = peer;

      peer.on("open", () => {
        if (cancelled) return;
        setState("waiting");
        // Only NOW attach reconnection — after we know we're the host
        attachReconnection(peer);
      });

      peer.on("call", (call) => {
        if (cancelled) return;
        call.answer(stream);
        setupCall(call);
      });

      // No peer.on("disconnected") here! It's attached inside "open" above.
      // This prevents destroy() in the unavailable-id handler from
      // triggering a false reconnection loop.

      peer.on("error", (err: { type: string }) => {
        if (cancelled) return;
        if (err.type === "unavailable-id") {
          // Expected for 2nd user — destroy this peer and join as caller
          peer.destroy();
          connectAsJoiner(PeerJS, stream);
        } else {
          setState("error");
          setErrorMessage(
            "Connection failed. Check your internet connection and try again."
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

  // ── Controls ─────────────────────────────────────────
  function toggleMute() {
    if (!streamRef.current) return;
    streamRef.current.getAudioTracks().forEach((t) => {
      t.enabled = !t.enabled;
    });
    setIsMuted((m) => !m);
  }

  function toggleCamera() {
    if (!streamRef.current) return;
    streamRef.current.getVideoTracks().forEach((t) => {
      t.enabled = !t.enabled;
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

  // ── Derived ──────────────────────────────────────────
  const showVideo =
    state === "connecting" ||
    state === "waiting" ||
    state === "connected" ||
    state === "reconnecting";

  // ── Status text for screen readers ───────────────────
  const statusText =
    state === "requesting"
      ? "Requesting camera access"
      : state === "connecting"
        ? "Connecting to server"
        : state === "waiting"
          ? peerLeft
            ? "Participant left the call"
            : "Waiting for participant"
          : state === "reconnecting"
            ? `Reconnecting, attempt ${reconnectAttempt} of ${MAX_RECONNECT}`
            : state === "connected"
              ? "Connected"
              : "";

  return (
    <div className="flex h-screen flex-col bg-[#111827]">
      {/* Screen reader status */}
      <div aria-live="polite" className="sr-only">
        {statusText}
      </div>

      {/* ── Top bar ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary"
          aria-label="Back to home"
        >
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
              aria-hidden="true"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">MeetUp</span>
        </a>

        <div className="flex items-center gap-3">
          {state === "connected" && (
            <div className="flex items-center gap-1.5 rounded-md bg-green-500/20 px-2.5 py-1">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs text-green-300">Connected</span>
            </div>
          )}
          {state === "reconnecting" && (
            <div className="flex items-center gap-1.5 rounded-md bg-yellow-500/20 px-2.5 py-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
              <span className="text-xs text-yellow-300">
                Reconnecting ({reconnectAttempt}/{MAX_RECONNECT})
              </span>
            </div>
          )}
          <div className="rounded-md bg-white/10 px-3 py-1 text-xs text-slate-300">
            Room: {roomId}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-4">
        {/* Requesting */}
        {state === "requesting" && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-blue-primary" />
            <p className="text-sm text-slate-300">
              Requesting camera access...
            </p>
          </div>
        )}

        {/* Error */}
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
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p role="alert" className="text-sm text-red-300">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Video area */}
        {showVideo && (
          <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
            {/* Remote video */}
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

            {/* Local video — large when alone, PiP when connected */}
            <div
              className={
                state === "connected"
                  ? "absolute bottom-3 right-3 z-10 aspect-video w-36 overflow-hidden rounded-xl border-2 border-white/20 bg-black shadow-lg transition-all sm:bottom-4 sm:right-4 sm:w-48"
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
                    aria-hidden="true"
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
              <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-black/70 px-4 py-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <p className="text-sm text-slate-300">
                  Connecting to server...
                </p>
              </div>
            )}

            {state === "waiting" && (
              <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-black/70 px-4 py-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                <p className="text-sm text-slate-300">
                  {peerLeft
                    ? "Participant left the call"
                    : "Waiting for participant..."}
                </p>
              </div>
            )}

            {state === "reconnecting" && (
              <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-yellow-900/80 px-4 py-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-yellow-200/30 border-t-yellow-200" />
                <p className="text-sm text-yellow-200">
                  Connection lost. Trying again ({reconnectAttempt}/
                  {MAX_RECONNECT})...
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Bottom control bar ── */}
      {showVideo && (
        <footer className="flex shrink-0 items-center justify-center border-t border-white/10 px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12 ${
                isMuted
                  ? "bg-red-500/20 hover:bg-red-500/30"
                  : "bg-white/10 hover:bg-white/20"
              }`}
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
                  aria-hidden="true"
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
                  aria-hidden="true"
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
              aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12 ${
                isCameraOff
                  ? "bg-red-500/20 hover:bg-red-500/30"
                  : "bg-white/10 hover:bg-white/20"
              }`}
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
                  aria-hidden="true"
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
                  aria-hidden="true"
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              )}
            </button>

            {/* Leave call */}
            <button
              onClick={leaveCall}
              aria-label="Leave call"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12"
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
                aria-hidden="true"
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
