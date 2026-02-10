/**
 * Updated Room Page Component
 * Integration example showing how to add chat to your existing room page
 * 
 * This shows how to modify: frontend/app/room/[roomId]/page.tsx
 * Add the ChatSidebar component to your existing video call interface
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams } from 'next/navigation';
import { ChatSidebar } from '@/app/components/ChatSidebar';

type RoomState = 'requesting' | 'connecting' | 'waiting' | 'connected' | 'error';

export default function RoomPage() {
  const params = useParams();
  const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId;

  // Existing video call state
  const [roomState, setRoomState] = useState<RoomState>('requesting');
  const [errorMessage, setErrorMessage] = useState('');
  const [peerId, setPeerId] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Chat-related state
  const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
  const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const callRef = useRef<Peer.MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  // Initialize Peer and setup video
  useEffect(() => {
    const initializePeer = async () => {
      try {
        // Get local media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Initialize Peer
        const peer = new Peer({
          host: 'localhost',
          port: 9000,
          path: '/peerjs',
        });

        peerRef.current = peer;

        peer.on('open', (id) => {
          setPeerId(id);
          setRoomState('waiting');
        });

        peer.on('call', (mediaConnection) => {
          callRef.current = mediaConnection;
          mediaConnection.answer(stream);

          mediaConnection.on('stream', (remoteStream) => {
            remoteStreamRef.current = remoteStream;
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
            setRoomState('connected');
          });

          mediaConnection.on('error', (error) => {
            setErrorMessage(`Connection error: ${error.message}`);
            setRoomState('error');
          });

          mediaConnection.on('close', () => {
            setRoomState('waiting');
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = null;
            }
          });
        });

        peer.on('error', (error) => {
          setErrorMessage(`Peer error: ${error.message}`);
          setRoomState('error');
        });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        setErrorMessage(`Failed to get media stream: ${errorMsg}`);
        setRoomState('error');
      }
    };

    initializePeer();

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
      callRef.current?.close();
      peerRef.current?.destroy();
    };
  }, []);

  // Handle media toggle functions
  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

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
          <button
            onClick={toggleMute}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isMuted
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {isMuted ? '🎤 Unmute' : '🔇 Mute'}
          </button>

          <button
            onClick={toggleCamera}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isCameraOff
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {isCameraOff ? '📹 Camera On' : '📷 Camera Off'}
          </button>

          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
            ☎️ End Call
          </button>
        </div>
      </div>

      {/* Chat Sidebar - Right Side */}
      <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
        <ChatSidebar roomId={roomId} userId={userId} userName={userName} />
      </div>

      {/* Mobile Chat Toggle - Hidden on desktop */}
      {/* Optional: Add modal/drawer for mobile devices */}
    </div>
  );
}
