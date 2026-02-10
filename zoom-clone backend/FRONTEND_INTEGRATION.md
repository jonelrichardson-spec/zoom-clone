# Frontend-Backend Integration Guide

## Overview

This document outlines how the backend chat service integrates with the Zoom Clone frontend (Next.js/React app using PeerJS for video calling).

## Current Frontend Architecture

### Technology Stack
- **Framework**: Next.js 16.1.6
- **State Management**: Zustand 5.0.11
- **WebRTC Library**: PeerJS 1.5.5
- **Styling**: TailwindCSS
- **UI Pattern**: Server-side routing with client-side components

### Frontend Project Structure
```
app/
├── page.tsx              # Home page (create/join meeting)
├── room/
│   └── [roomId]/
│       └── page.tsx      # Video call page
├── layout.tsx            # Root layout
└── globals.css           # Global styles
```

### Key Pages

#### 1. **Home Page** (`app/page.tsx`)
- **Purpose**: Create or join a meeting
- **Features**:
  - Generate unique meeting URL (8-character UUID)
  - Copy URL to clipboard
  - Join existing meeting
- **Uses**: Native crypto API for UUID generation
- **Outputs**: Routes to `/room/[roomId]` on join

#### 2. **Room Page** (`app/room/[roomId]/page.tsx`)
- **Purpose**: Video call interface
- **Features**:
  - P2P video streaming via WebRTC/PeerJS
  - Mute/unmute microphone
  - Turn camera on/off
  - Leave call
  - Call status indicators (requesting, connecting, waiting, connected, error)
- **Uses**: PeerJS for signaling and connection
- **State**: Local React state (no global store yet)

### PeerJS Connection Flow

```
Home Page (/room/[roomId])
  ↓
Request Camera Permission (getUserMedia)
  ↓
Connect to PeerJS Server
  ↓
Attempt to Register as "Host" (peer ID = roomId)
  ↓
If ID Taken (unavailable-id error)
  ├→ Register as "Joiner" with random ID
  └→ Call the Host (peer ID = roomId)
  ↓
Listen for Incoming Calls / Answer Calls
  ↓
Stream MediaConnection (video/audio)
```

## Backend Chat Service Integration Points

### 1. **No Current Integration** (MVP Phase)
The current MVP focuses on peer-to-peer video calling **without** backend involvement:
- Video streaming is P2P via WebRTC/PeerJS
- PeerJS server (0.peerjs.com) handles signaling
- **No messaging/chat in current MVP**

### 2. **Chat Service - Phase 2 Integration**

When implementing chat alongside video calls:

#### **Separate Communication Channels**
1. **Video/Audio**: WebRTC P2P (PeerJS)
2. **Chat Messages**: WebSocket (Socket.IO) - Our Backend
3. **Signaling**: PeerJS Server (0.peerjs.com)

#### **Backend Requirements for Chat Integration**

**A. Room Management**
```typescript
// Backend should support:
POST /api/chat/rooms
  - Create chat room associated with roomId
  - roomId = same as PeerJS room ID
  - Body: { meetingId, roomName, userId }

GET /api/chat/rooms/:roomId
  - Fetch room details
  
GET /api/chat/rooms/:roomId/messages
  - Get message history for room
```

**B. WebSocket Events for Chat**
```javascript
// Frontend connects to backend WebSocket:
socket.emit('user_connected', {
  userId: 'user-unique-id',
  userName: 'John Doe',
  userAvatar: 'https://...'
});

socket.emit('join_room', {
  roomId: roomId,  // Same as PeerJS room ID
  meetingId: 'call-session-id'
});

// Send chat message
socket.emit('new_message', {
  roomId: roomId,
  userId: 'user-id',
  userName: 'John Doe',
  content: 'Hello!',
  timestamp: new Date()
});

// Listen for messages
socket.on('new_message', (message) => {
  // Display in chat UI
});
```

## Implementation Checklist

### Phase 1 (Current - Video Only)
- [x] Video calling via PeerJS
- [x] Mute/camera controls
- [x] Room-based call routing
- [x] Error handling and permissions

### Phase 2 (Chat Integration)
- [ ] Create chat UI component (sidebar in video room)
- [ ] Connect frontend to backend WebSocket
- [ ] Display real-time messages
- [ ] Implement typing indicators
- [ ] Add message history
- [ ] Add emoji reactions

### Phase 3 (Advanced)
- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] User authentication (JWT)
- [ ] Message search
- [ ] File sharing
- [ ] Screen sharing

## Data Models Alignment

### Room ID Format
- **Frontend** (PeerJS): 8-character UUID (e.g., `a1b2c3d4`)
- **Backend** (Chat): Same format, stored in `ChatRoom.id`
- **Meeting ID**: Optional additional identifier for grouping

### User Identification
```typescript
// Frontend identifies users by:
- userId: unique identifier (needs to come from auth system)
- userName: display name
- userAvatar: profile picture URL

// Backend expects same structure in WebSocket events
```

### Message Structure
```typescript
// Backend ChatMessage model
{
  id: string;                      // UUID
  roomId: string;                  // Same as PeerJS room ID
  userId: string;                  // User identifier
  userName: string;                // Display name
  userAvatar?: string;             // Profile picture
  content: string;                 // Message text
  timestamp: Date;                 // When sent
  edited?: boolean;
  editedAt?: Date;
  reactions?: Record<string, string[]>; // emoji -> [userId, ...]
}
```

## CORS Configuration

The backend CORS setting must match the frontend URL:

```env
# Backend .env
CORS_ORIGIN=http://localhost:3000    # For development
CORS_ORIGIN=https://your-domain.com  # For production
```

Frontend will be running on `localhost:3000` (Next.js default).

## Environment Variables

### Frontend (Next.js)
```env
# .env.local (not tracked in git)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (Express)
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Socket.IO Client Example (for Frontend)

When implementing chat in the frontend:

```typescript
// hooks/useChat.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useChat(roomId: string, userId: string, userName: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
    });

    newSocket.emit('user_connected', { userId, userName });
    newSocket.emit('join_room', { roomId });

    // Listen for messages
    newSocket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit('leave_room', { roomId });
      newSocket.disconnect();
    };
  }, [roomId, userId, userName]);

  const sendMessage = (content: string) => {
    socket?.emit('new_message', {
      roomId,
      userId,
      userName,
      content,
      timestamp: new Date(),
    });
  };

  return { messages, sendMessage };
}
```

## Testing Integration

### 1. Start Backend
```bash
cd zoom-clone\ backend
npm run dev:watch
# Server runs on http://localhost:3001
```

### 2. Start Frontend
```bash
cd zoom-clone  # Frontend directory
npm run dev
# App runs on http://localhost:3000
```

### 3. Test Communication
- Open two browser windows
- Create meeting in one window
- Join with the other
- Video should connect via PeerJS
- Chat (when integrated) should work via Socket.IO backend

## Future Enhancements

### Database Integration
```typescript
// Replace in-memory storage with:
- PostgreSQL: production-grade relational DB
- MongoDB: flexible document storage
- Redis: caching for active rooms
```

### Authentication
```typescript
// Add JWT-based auth:
- User registration/login
- Token generation
- Middleware to verify socket connections
- User validation in chat operations
```

### Analytics
```typescript
// Track:
- Message count per room
- Active users
- Connection metrics
- Call duration
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `CORS_ORIGIN` matches frontend URL
   - Ensure credentials are enabled in socket options

2. **WebSocket Connection Fails**
   - Verify backend is running on correct port
   - Check firewall/network settings
   - Ensure `transports: ['websocket', 'polling']` in client

3. **Messages Not Appearing**
   - Check browser console for Socket.IO errors
   - Verify room ID format matches
   - Ensure user is authenticated before sending

## References

- **PeerJS Docs**: https://peerjs.com/docs
- **Socket.IO Docs**: https://socket.io/docs/
- **WebRTC Docs**: https://webrtc.org/
- **Next.js Docs**: https://nextjs.org/docs

## Contact

- **Frontend Owner**: Jonel Richardson
- **Backend Owner**: Gary Gonzalez
- **Repo**: https://github.com/jonelrichardson-spec/zoom-clone

      console.error('❌ Socket error:', error);
      this.onError(error);
    });
  }

  /**
   * Join a chat room
   */
  joinRoom(roomId: string, meetingId: string): void {
    this.currentRoomId = roomId;
    this.socket.emit('join_room', { roomId, meetingId });
  }

  /**
   * Leave current room
   */
  leaveRoom(): void {
    if (this.currentRoomId) {
      this.socket.emit('leave_room', { roomId: this.currentRoomId });
      this.currentRoomId = null;
    }
  }

  /**
   * Send a message
   */
  sendMessage(content: string): void {
    if (!this.currentRoomId) {
      console.error('Not connected to a room');
      return;
    }

    this.socket.emit('new_message', {
      roomId: this.currentRoomId,
      userId: this.userId,
      userName: this.userName,
      content,
      timestamp: new Date(),
    });
  }

  /**
   * Notify server that user is typing
   */
  startTyping(): void {
    if (!this.currentRoomId) return;

    this.socket.emit('user_typing', {
      roomId: this.currentRoomId,
      userId: this.userId,
      userName: this.userName,
      isTyping: true,
    });
  }

  /**
   * Notify server that user stopped typing
   */
  stopTyping(): void {
    if (!this.currentRoomId) return;

    this.socket.emit('user_stopped_typing', {
      roomId: this.currentRoomId,
      userId: this.userId,
      userName: this.userName,
      isTyping: false,
    });
  }

  /**
   * Add emoji reaction to a message
   */
  addReaction(messageId: string, emoji: string): void {
    if (!this.currentRoomId) return;

    this.socket.emit('message_reaction', {
      roomId: this.currentRoomId,
      messageId,
      userId: this.userId,
      emoji,
    });
  }

  /**
   * Edit a message
   */
  editMessage(messageId: string, newContent: string): void {
    if (!this.currentRoomId) return;

    this.socket.emit('message_edited', {
      messageId,
      roomId: this.currentRoomId,
      content: newContent,
    });
  }

  /**
   * Delete a message
   */
  deleteMessage(messageId: string): void {
    if (!this.currentRoomId) return;

    this.socket.emit('message_deleted', {
      messageId,
      roomId: this.currentRoomId,
    });
  }

  /**
   * Disconnect from server
   */
  disconnect(): void {
    this.socket.disconnect();
  }

  // =========================
  // Callback Methods (Override in your app)
  // =========================

  protected onMessageReceived(message: any): void {
    // Override this method in your component
  }

  protected onMessageEdited(data: any): void {
    // Override this method in your component
  }

  protected onMessageDeleted(data: any): void {
    // Override this method in your component
  }

  protected onUserTyping(data: any): void {
    // Override this method in your component
  }

  protected onUserStoppedTyping(data: any): void {
    // Override this method in your component
  }

  protected onUserJoined(data: any): void {
    // Override this method in your component
  }

  protected onUserLeft(data: any): void {
    // Override this method in your component
  }

  protected onMessageReaction(data: any): void {
    // Override this method in your component
  }

  protected onError(error: any): void {
    // Override this method in your component
  }
}

// =========================
// Usage Example (React Component)
// =========================

/**
 * Example React Hook for Chat Integration
 */
export function useChat(userId: string, userName: string) {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [typingUsers, setTypingUsers] = React.useState<string[]>([]);
  const chatClientRef = React.useRef<ChatClient | null>(null);

  React.useEffect(() => {
    // Initialize chat client
    const chatClient = new ChatClient(userId, userName);

    // Override callbacks
    chatClient.onMessageReceived = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    chatClient.onUserTyping = (data) => {
      setTypingUsers((prev) => {
        if (!prev.includes(data.userName)) {
          return [...prev, data.userName];
        }
        return prev;
      });
    };

    chatClient.onUserStoppedTyping = (data) => {
      setTypingUsers((prev) => prev.filter((name) => name !== data.userName));
    };

    chatClientRef.current = chatClient;

    return () => {
      chatClient.disconnect();
    };
  }, [userId, userName]);

  return {
    messages,
    typingUsers,
    sendMessage: (content: string) =>
      chatClientRef.current?.sendMessage(content),
    joinRoom: (roomId: string, meetingId: string) =>
      chatClientRef.current?.joinRoom(roomId, meetingId),
    leaveRoom: () => chatClientRef.current?.leaveRoom(),
    startTyping: () => chatClientRef.current?.startTyping(),
    stopTyping: () => chatClientRef.current?.stopTyping(),
    addReaction: (messageId: string, emoji: string) =>
      chatClientRef.current?.addReaction(messageId, emoji),
  };
}

export default ChatClient;
