"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [meetingUrl, setMeetingUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function createMeeting() {
    const roomId = crypto.randomUUID().slice(0, 8);
    const url = `${window.location.origin}/room/${roomId}`;
    setMeetingUrl(url);
    setCopied(false);
  }

  async function copyToClipboard() {
    if (!meetingUrl) return;
    try {
      await navigator.clipboard.writeText(meetingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = meetingUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function joinMeeting() {
    if (!meetingUrl) return;
    const roomId = meetingUrl.split("/room/")[1];
    router.push(`/room/${roomId}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <main className="flex w-full max-w-md flex-col items-center gap-8">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-primary">
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

        {/* Create Meeting Button */}
        <button
          onClick={createMeeting}
          className="w-full cursor-pointer rounded-lg bg-blue-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-hover"
        >
          Create Meeting
        </button>

        {/* Meeting URL Display */}
        {meetingUrl && (
          <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Share this link to invite someone:
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={meetingUrl}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-foreground dark:border-slate-600 dark:bg-slate-900"
              />
              <button
                onClick={copyToClipboard}
                className="shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={joinMeeting}
              className="w-full cursor-pointer rounded-lg bg-blue-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-hover"
            >
              Join Meeting
            </button>
          </div>
        )}

        {/* Toast notification */}
        {copied && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg dark:bg-white dark:text-slate-900">
            Link copied to clipboard
          </div>
        )}
      </main>
    </div>
  );
}
