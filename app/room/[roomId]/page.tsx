"use client";

import { use, useEffect, useRef, useState } from "react";
import type Peer from "peerjs";
import type { MediaConnection } from "peerjs";
import { PEER_CONFIG, ICE_SERVERS } from "@/lib/peerConfig";
import { checkBrowserSupport, isValidRoomId } from "@/lib/browserCheck";
import { Camera, Mic, MicOff, CameraOff, Play, Settings2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────
type RoomState =
  | "requesting"
  | "connecting"
  | "waiting"
  | "connected"
  | "reconnecting"
  | "error";

type DeviceInfo = {
  deviceId: string;
  label: string;
};

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

  // ── Preview State ────────────────────────────────────
  const [isPreviewing, setIsPreviewing] = useState(true);
  const [previewCameras, setPreviewCameras] = useState<DeviceInfo[]>([]);
  const [previewMicrophones, setPreviewMicrophones] = useState<DeviceInfo[]>(
    []
  );
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const [previewIsMuted, setPreviewIsMuted] = useState(false);
  const [previewIsCameraOff, setPreviewIsCameraOff] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(true);
  const [previewError, setPreviewError] = useState<string>("");

  // ── State ────────────────────────────────────────────
  const [state, setState] = useState<RoomState>("requesting");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [peerLeft, setPeerLeft] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  // ── Callback refs for video elements ─────────────────
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  function attachLocalVideo(el: HTMLVideoElement | null) {
    localVideoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  }

  function attachPreviewVideo(el: HTMLVideoElement | null) {
    previewVideoRef.current = el;
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

  // ── Preview: Enumerate Devices ──────────────────────
  useEffect(() => {
    async function enumerateDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices
          .filter((d) => d.kind === "videoinput")
          .map((d) => ({ deviceId: d.deviceId, label: d.label || `Camera ${d.deviceId.slice(0, 5)}` }));
        const mics = devices
          .filter((d) => d.kind === "audioinput")
          .map((d) => ({ deviceId: d.deviceId, label: d.label || `Microphone ${d.deviceId.slice(0, 5)}` }));

        setPreviewCameras(cameras);
        setPreviewMicrophones(mics);
        setSelectedCamera(cameras[0]?.deviceId || "");
        setSelectedMicrophone(mics[0]?.deviceId || "");
      } catch {
        setPreviewError("Unable to enumerate devices");
      }
    }

    enumerateDevices();
  }, []);

  // ── Preview: Request Camera Stream ──────────────────
  useEffect(() => {
    if (!isPreviewing) return;

    setPreviewLoading(true);
    setPreviewError("");

    const requestPreviewStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
          audio: selectedMicrophone ? { deviceId: { exact: selectedMicrophone } } : true,
        });

        streamRef.current = stream;
        setPreviewLoading(false);

        // Apply initial mute/camera states
        stream.getAudioTracks().forEach((track) => {
          track.enabled = !previewIsMuted;
        });
        stream.getVideoTracks().forEach((track) => {
          track.enabled = !previewIsCameraOff;
        });
      } catch (err) {
        setPreviewLoading(false);
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            setPreviewError(
              "Camera access denied. Enable it in your browser settings."
            );
          } else if (err.name === "NotFoundError") {
            setPreviewError("No camera or microphone found.");
          } else if (err.name === "NotReadableError") {
            setPreviewError(
              "Camera is in use by another app. Close it and try again."
            );
          } else {
            setPreviewError(err.message);
          }
        } else {
          setPreviewError("Failed to access camera.");
        }
      }
    };

    requestPreviewStream();

    return () => {
      // Don't stop stream here; we need it for the call
    };
  }, [isPreviewing, selectedCamera, selectedMicrophone]);

  // ── Preview: Switch Camera ──────────────────────────
  const switchCamera = async (deviceId: string) => {
    setSelectedCamera(deviceId);
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => track.stop());
    }
  };

  // ── Preview: Switch Microphone ──────────────────────
  const switchMicrophone = async (deviceId: string) => {
    setSelectedMicrophone(deviceId);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => track.stop());
    }
  };

  // ── Preview: Toggle Mute ────────────────────────────
  const togglePreviewMute = () => {
    if (!streamRef.current) return;
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = previewIsMuted;
    });
    setPreviewIsMuted(!previewIsMuted);
  };

  // ── Preview: Toggle Camera ──────────────────────────
  const togglePreviewCamera = () => {
    if (!streamRef.current) return;
    streamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = previewIsCameraOff;
    });
    setPreviewIsCameraOff(!previewIsCameraOff);
  };

  // ── Preview: Join Meeting ──────────────────────────
  const handleJoinMeeting = async () => {
    // Stream is ready, transition to call
    setIsPreviewing(false);
    setState("connecting");
  };

  // ── Main effect ──────────────────────────────────────
  useEffect(() => {
    if (isPreviewing) return; // Don't start call setup while previewing

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
        setState("waiting");
        setPeerLeft(true);
      });

      call.on("error", (err) => {
        setState("error");
        setErrorMessage(`Call error: ${err.message}`);
      });
    }

    // ── Reconnection logic ──────────────────────────────
    function attachReconnection(peer: Peer) {
      peer.on("disconnected", () => {
        if (cancelled) return;
        if (reconnectCountRef.current >= MAX_RECONNECT) {
          setState("error");
          setErrorMessage("Connection lost. Please refresh and try again.");
          return;
        }

        setState("reconnecting");
        setReconnectAttempt((prev) => prev + 1);
        reconnectCountRef.current += 1;

        setTimeout(() => {
          if (cancelled) return;
          peer.reconnect();
        }, RECONNECT_DELAY);
      });
    }

    // ── Join as joiner ──────────────────────────────────
    function connectAsJoiner(PeerJS: typeof Peer, stream: MediaStream) {
      if (cancelled) return;

      roleRef.current = "joiner";
      const peer = new PeerJS({
        ...PEER_CONFIG,
        config: ICE_SERVERS,
      });

      peerRef.current = peer;

      peer.on("open", () => {
        if (cancelled) return;

        const call = peer.call(roomId, stream);
        setupCall(call);

        attachReconnection(peer);
      });

      peer.on("error", (err: { type: string }) => {
        if (cancelled) return;
        setState("error");
        setErrorMessage(
          "Connection failed. Check your internet connection and try again."
        );
      });
    }

    // ── Main init ──────────────────────────────────────
    async function init() {
      // Stream already exists from preview, just use it
      if (!streamRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
            },
          });
          streamRef.current = stream;
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
      }

      if (cancelled) {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        return;
      }

      setState("connecting");

      // Step 2: Load PeerJS
      const { default: PeerJS } = await import("peerjs");
      PeerJSRef.current = PeerJS;
      if (cancelled) {
        streamRef.current?.getTracks().forEach((t) => t.stop());
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
        call.answer(streamRef.current!);
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
          connectAsJoiner(PeerJS, streamRef.current!);
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
  }, [roomId, isPreviewing]);

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
          : state === "connected"
            ? "Call connected"
            : state === "reconnecting"
              ? "Reconnecting"
              : "Error";

  // ── PREVIEW SCREEN ──────────────────────────────────
  if (isPreviewing) {
    return (
      <div className="flex h-screen flex-col bg-slate-900 text-white">
        {/* Header */}
        <header className="border-b border-white/10 px-6 py-4">
          <h1 className="text-2xl font-bold">Join Meeting</h1>
          <p className="mt-1 text-sm text-slate-400">Room: {roomId}</p>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 sm:flex-row sm:gap-12">
          {/* Video Preview */}
          <div className="flex w-full flex-col items-center gap-4 sm:w-auto">
            <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
              {previewLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-blue-500" />
                </div>
              )}
              {!previewLoading && previewError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <div className="text-center">
                    <CameraOff className="mx-auto mb-2 h-12 w-12 text-red-400" />
                    <p className="text-sm text-red-300">{previewError}</p>
                  </div>
                </div>
              )}
              {!previewError && (
                <video
                  ref={attachPreviewVideo}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover ${
                    previewLoading ? "hidden" : ""
                  }`}
                />
              )}
              {previewIsCameraOff && !previewError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <CameraOff className="h-16 w-16 text-slate-500" />
                </div>
              )}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="flex w-full flex-col gap-6 sm:w-96">
            {/* Camera Selection */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Camera className="h-4 w-4" />
                Camera
              </label>
              <select
                value={selectedCamera}
                onChange={(e) => switchCamera(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              >
                {previewCameras.map((cam) => (
                  <option key={cam.deviceId} value={cam.deviceId}>
                    {cam.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Microphone Selection */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Mic className="h-4 w-4" />
                Microphone
              </label>
              <select
                value={selectedMicrophone}
                onChange={(e) => switchMicrophone(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              >
                {previewMicrophones.map((mic) => (
                  <option key={mic.deviceId} value={mic.deviceId}>
                    {mic.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Test Controls */}
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-white/10 bg-slate-800/50 p-4">
              <button
                onClick={togglePreviewMute}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  previewIsMuted
                    ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {previewIsMuted ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
                {previewIsMuted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={togglePreviewCamera}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  previewIsCameraOff
                    ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {previewIsCameraOff ? (
                  <CameraOff className="h-4 w-4" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
                {previewIsCameraOff ? "Camera Off" : "Camera On"}
              </button>
            </div>

            {/* Join Button */}
            <button
              onClick={handleJoinMeeting}
              disabled={previewLoading || !!previewError}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-600 disabled:text-slate-400"
            >
              <Play className="h-5 w-5" />
              Join Meeting
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ── CALL SCREEN ──────────────────────────────────────
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      {/* ── Status bar ── */}
      <header className="border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Meeting {roomId}</h1>
            <p className="text-xs text-slate-400 sm:text-sm">
              {state === "waiting" && (peerLeft ? "Participant left" : "Waiting for participant...")}
              {state === "connected" && "Connected"}
              {state === "connecting" && "Connecting..."}
              {state === "reconnecting" && `Reconnecting (${reconnectAttempt}/${MAX_RECONNECT})`}
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {statusText}
          </span>
        </div>
      </header>

      {/* ── Main video area ── */}
      {state === "error" ? (
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="max-w-md rounded-lg border border-red-500/50 bg-red-500/10 p-6 text-center">
            <h2 className="mb-2 text-lg font-semibold text-red-400">
              Connection Error
            </h2>
            <p className="mb-4 text-sm text-red-300">{errorMessage}</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700"
            >
              Go Back Home
            </button>
          </div>
        </main>
      ) : (
        <main className="flex flex-1 flex-col items-center justify-center overflow-hidden px-2 py-4 sm:px-4 sm:py-6">
          <div className="flex h-full w-full max-w-5xl flex-col items-center justify-center gap-4">
            {/* Remote video — full size when available */}
            {remoteStreamRef.current && state === "connected" && (
              <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-black">
                <video
                  ref={attachRemoteVideo}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
                {state !== "connected" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center">
                      <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
                      <p className="text-sm text-slate-300">Loading video...</p>
                    </div>
                  </div>
                )}
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
        </main>
      )}

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
