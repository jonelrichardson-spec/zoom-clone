"use client";

import { use, useEffect, useRef, useState } from "react";

type ConnectionState = "requesting" | "preview" | "error";

export default function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  const streamRef = useRef<MediaStream | null>(null);

  // Callback ref: sets srcObject as soon as the <video> element mounts
  const videoRef = useRef<HTMLVideoElement>(null);
  function attachVideo(el: HTMLVideoElement | null) {
    videoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  }

  const [state, setState] = useState<ConnectionState>("requesting");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check browser support
    if (!navigator.mediaDevices?.getUserMedia) {
      setState("error");
      setErrorMessage(
        "Your browser doesn't support video calls. Please use Chrome, Firefox, or Safari."
      );
      return;
    }

    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: { echoCancellation: true, noiseSuppression: true },
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        setState("preview");
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
          setErrorMessage("An unexpected error occurred accessing your camera.");
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#111827]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
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
        <div className="rounded-md bg-white/10 px-3 py-1 text-xs text-slate-300">
          Room: {roomId}
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4">
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

        {/* Video preview */}
        {state === "preview" && (
          <div className="flex w-full max-w-3xl flex-col items-center gap-4">
            {/* Waiting message */}
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
              <p className="text-sm text-slate-300">
                Waiting for participant...
              </p>
            </div>

            {/* Local video */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <video
                ref={attachVideo}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                You
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom control bar placeholder */}
      <footer className="flex items-center justify-center border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
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
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
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
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
