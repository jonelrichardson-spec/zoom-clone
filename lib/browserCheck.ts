export interface BrowserCheckResult {
  supported: boolean;
  message: string;
}

/** Checks whether the current browser supports WebRTC video calls. */
export function checkBrowserSupport(): BrowserCheckResult {
  if (typeof window === "undefined") {
    return { supported: false, message: "" };
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    return {
      supported: false,
      message:
        "Your browser doesn't support camera access. Please use Chrome, Firefox, Safari, or Edge.",
    };
  }

  if (!window.RTCPeerConnection) {
    return {
      supported: false,
      message:
        "Your browser doesn't support peer-to-peer connections. Please use Chrome, Firefox, Safari, or Edge.",
    };
  }

  return { supported: true, message: "" };
}

/** Returns true if the room ID is a valid format (alphanumeric, 4-36 chars). */
export function isValidRoomId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{4,36}$/.test(id);
}
