# 🎨 Room Page Modification Guide

**How to update your existing room page with ChatSidebar**

---

## Overview

You need to modify ONE file: `app/room/[roomId]/page.tsx`

Three changes:
1. Add import for ChatSidebar
2. Add state for userId and userName
3. Wrap JSX in flex container with chat sidebar

---

## Your Current Room Page

It probably looks like this:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId;

  // ... existing state and logic ...

  return (
    <div>
      {/* Your video component here */}
      {/* Controls, etc. */}
    </div>
  );
}
```

---

## Step 1: Add Import

**At the TOP of the file, after existing imports:**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams } from 'next/navigation';
import { ChatSidebar } from '@/app/components/ChatSidebar';  // ← ADD THIS LINE
```

---

## Step 2: Add Chat State

**Inside your component, after getting roomId:**

```tsx
export default function RoomPage() {
  const params = useParams();
  const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId;

  // ADD THESE TWO LINES:
  const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
  const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);

  // ... rest of your existing code ...
}
```

---

## Step 3: Update JSX Return

**Replace your existing `return` statement with:**

```tsx
return (
  <div className="flex h-screen bg-gray-900">
    {/* Video Area - Left Side */}
    <div className="flex-1">
      {/* MOVE ALL YOUR EXISTING VIDEO CODE HERE */}
      {/* Your video container, remote video, local video (PiP), controls, etc. */}
      
      {/* All the JSX from your current return goes here */}
      {/* Example: */}
      {/* <div className="flex-1 bg-black relative"> */}
      {/*   <video ref={remoteVideoRef} /> */}
      {/*   ... existing video code ... */}
      {/* </div> */}
    </div>

    {/* Chat Sidebar - Right Side */}
    <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
      <ChatSidebar 
        roomId={roomId} 
        userId={userId} 
        userName={userName} 
      />
    </div>
  </div>
);
```

---

## Complete Example

Here's a complete updated room page (from INTEGRATION_RoomPageExample.tsx):

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams } from 'next/navigation';
import { ChatSidebar } from '@/app/components/ChatSidebar';  // ← NEW IMPORT

type RoomState = 'requesting' | 'connecting' | 'waiting' | 'connected' | 'error';

export default function RoomPage() {
  const params = useParams();
  const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId;

  // Video state
  const [roomState, setRoomState] = useState<RoomState>('requesting');
  const [errorMessage, setErrorMessage] = useState('');
  const [peerId, setPeerId] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Chat state (← NEW)
  const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
  const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const callRef = useRef<Peer.MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  // ... your existing useEffect and handlers ...

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Video Area - Left Side */}
      <div className="flex-1 flex flex-col">
        {/* Main Video Container */}
        <div className="flex-1 bg-black relative">
          {/* Remote Video */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-black border-2 border-gray-700 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Status Overlay */}
          {roomState !== 'connected' && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center">
                {roomState === 'error' ? (
                  <>
                    <p className="text-red-400 text-2xl font-bold mb-4">Connection Error</p>
                    <p className="text-white">{errorMessage}</p>
                  </>
                ) : (
                  <>
                    <p className="text-white text-2xl font-bold mb-4">Waiting for peer...</p>
                    <p className="text-gray-300">Your peer ID: {peerId}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 flex gap-4">
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium">
            🎤 Mute
          </button>
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium">
            📷 Camera Off
          </button>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">
            ☎️ End Call
          </button>
        </div>
      </div>

      {/* Chat Sidebar - Right Side (← NEW) */}
      <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
        <ChatSidebar 
          roomId={roomId} 
          userId={userId} 
          userName={userName} 
        />
      </div>
    </div>
  );
}
```

---

## Key Changes Explained

### 1. Import ChatSidebar
```tsx
import { ChatSidebar } from '@/app/components/ChatSidebar';
```
This imports the chat component you copied to your frontend.

### 2. Add Chat State
```tsx
const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
```
Generates unique user ID and name for chat identification.

### 3. Flex Layout
```tsx
<div className="flex h-screen bg-gray-900">
  <div className="flex-1">      {/* Video - takes remaining space */}
  </div>
  <div className="w-80">       {/* Chat - fixed 320px width */}
  </div>
</div>
```
Uses Tailwind flex to create split-screen layout:
- Left: Video (flex-1 = takes all remaining space)
- Right: Chat (w-80 = 320px fixed width)

### 4. Hide on Mobile
```tsx
<div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
```
- `hidden` = hidden by default (mobile)
- `md:flex` = visible on medium screens and up
- Responsive design!

---

## Customization Tips

### Change Sidebar Width
```tsx
<div className="w-80">  {/* 80 = 320px */}
    {/* Change 80 to: */}
    {/* w-64 = 256px (narrower) */}
    {/* w-96 = 384px (wider) */}
```

### Change Colors
```tsx
<div className="bg-gray-900 border-l border-gray-700">
    {/* Change bg-gray-900 to bg-slate-900, bg-blue-900, etc */}
```

### Show on Mobile Too
```tsx
<div className="w-full md:w-80 flex flex-col">
    {/* Remove 'hidden' and change w-80 to w-full md:w-80 */}
```

---

## That's It!

Just three simple changes and your chat is integrated! 🎉

**Next:** Follow the startup commands in QUICK_COPY_COMMANDS.md
