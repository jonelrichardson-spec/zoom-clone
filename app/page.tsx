"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkBrowserSupport, isValidRoomId } from "@/lib/browserCheck";

export default function Home() {
  const router = useRouter();

  // ── State ─────────────────────────────────────────────
  const [browserError, setBrowserError] = useState("");
  const [meetingUrl, setMeetingUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [creating, setCreating] = useState(false);
  const [joinId, setJoinId] = useState("");
  const [joinError, setJoinError] = useState("");

  // ── Browser check on mount ────────────────────────────
  useEffect(() => {
    const { supported, message } = checkBrowserSupport();
    if (!supported) setBrowserError(message);
  }, []);

  // ── Actions ───────────────────────────────────────────
  function createMeeting() {
    setCreating(true);
    const roomId = crypto.randomUUID().slice(0, 8);
    const url = `${window.location.origin}/room/${roomId}`;
    setMeetingUrl(url);
    setCopied(false);
    setCreating(false);
  }

  async function copyToClipboard() {
    if (!meetingUrl) return;
    try {
      await navigator.clipboard.writeText(meetingUrl);
    } catch {
      const input = document.createElement("input");
      input.value = meetingUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function joinCreatedMeeting() {
    if (!meetingUrl) return;
    const roomId = meetingUrl.split("/room/")[1];
    router.push(`/room/${roomId}`);
  }

  function joinExistingMeeting() {
    setJoinError("");
    const trimmed = joinId.trim();

    // Accept full URLs or bare IDs
    let roomId = trimmed;
    if (trimmed.includes("/room/")) {
      roomId = trimmed.split("/room/")[1]?.split(/[?#]/)[0] ?? "";
    }

    if (!roomId || !isValidRoomId(roomId)) {
      setJoinError("Invalid meeting link. Check the ID and try again.");
      return;
    }

    router.push(`/room/${roomId}`);
  }

  // ── Render ────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <main className="flex w-full max-w-md flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-primary"
            aria-hidden="true"
          >
            <svg
              width="32"
              height="32"
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            MeetUp
          </h1>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Video calls made simple. No downloads, no login required.
          </p>
        </div>

        {/* Browser incompatible banner */}
        {browserError && (
          <div
            role="alert"
            className="w-full rounded-lg border border-red-300 bg-red-50 p-4 text-center text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
          >
            {browserError}
          </div>
        )}

        {/* Create Meeting */}
        <button
          onClick={createMeeting}
          disabled={!!browserError || creating}
          aria-label="Create a new meeting"
          className="w-full cursor-pointer rounded-lg bg-blue-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {creating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Creating...
            </span>
          ) : (
            "Create Meeting"
          )}
        </button>

        {/* Generated meeting link */}
        {meetingUrl && (
          <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Share this link to invite someone:
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={meetingUrl}
                aria-label="Meeting link"
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-foreground dark:border-slate-600 dark:bg-slate-900"
              />
              <button
                onClick={copyToClipboard}
                aria-label={copied ? "Link copied" : "Copy meeting link"}
                className="shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
            <button
              onClick={joinCreatedMeeting}
              aria-label="Join the meeting you just created"
              className="w-full cursor-pointer rounded-lg bg-blue-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary"
            >
              Join Meeting
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-400">or join an existing meeting</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Join existing meeting */}
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={joinId}
              onChange={(e) => {
                setJoinId(e.target.value);
                setJoinError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") joinExistingMeeting();
              }}
              placeholder="Enter Meeting ID or link"
              aria-label="Meeting ID or link"
              aria-invalid={!!joinError}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-slate-400 focus:border-blue-primary focus:outline-none focus:ring-1 focus:ring-blue-primary dark:border-slate-600 dark:bg-slate-800 dark:placeholder:text-slate-500"
            />
            <button
              onClick={joinExistingMeeting}
              disabled={!joinId.trim() || !!browserError}
              aria-label="Join meeting"
              className="shrink-0 cursor-pointer rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              Join
            </button>
          </div>
          {joinError && (
            <p role="alert" className="text-xs text-red-500">
              {joinError}
            </p>
          )}
        </div>

        {/* Toast */}
        {copied && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg dark:bg-white dark:text-slate-900"
          >
            Link copied to clipboard
          </div>
        )}
      </main>
    </div>
  );
}
