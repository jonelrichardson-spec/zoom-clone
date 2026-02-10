/**
 * Chat Service Integration
 * Socket.IO client setup for real-time chat communication with backend
 * 
 * Place this file in: frontend/app/lib/chat/socketService.ts
 * Usage: Import and use in your chat components
 */

import { io, Socket } from 'socket.io-client';

export type RoomState = 'requesting' | 'connecting' | 'waiting' | 'connected' | 'error';

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
  reactions?: Record<string, string[]>;
}

export interface UserPresence {
  userId: string;
  userName: string;
  isTyping: boolean;
}

class ChatSocketService {
  private socket: Socket | null = null;
  private userId: string = '';
  private userName: string = '';
  private userAvatar?: string;
  private currentRoomId: string | null = null;

  /**
   * Initialize Socket.IO connection
   */
  connect(userId: string, userName: string, userAvatar?: string): void {
    if (this.socket?.connected) {
      console.log('Already connected to chat server');
      return;
    }

    this.userId = userId;
    this.userName = userName;
    this.userAvatar = userAvatar;

    const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    this.socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Setup connection event listeners
    this.setupConnectionEvents();

    // Authenticate user
    this.socket.emit('user_connected', {
      userId,
      userName,
      userAvatar,
    });

    console.log('✅ Chat service connected');
  }

  /**
   * Setup core connection event listeners
   */
  private setupConnectionEvents(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    this.socket.on('user_connected_ack', () => {
      console.log('✅ User authenticated on server');
    });
  }

  /**
   * Join a chat room
   */
  joinRoom(roomId: string, meetingId?: string): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    this.currentRoomId = roomId;

    this.socket.emit('join_room', {
      roomId,
      meetingId,
    });

    console.log(`✅ Joined room: ${roomId}`);
  }

  /**
   * Leave current room
   */
  leaveRoom(): void {
    if (!this.socket || !this.currentRoomId) return;

    this.socket.emit('leave_room', {
      roomId: this.currentRoomId,
    });

    this.currentRoomId = null;
    console.log('✅ Left room');
  }

  /**
   * Send a message
   */
  sendMessage(content: string): void {
    if (!this.socket || !this.currentRoomId) {
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
   * Edit a message
   */
  editMessage(messageId: string, newContent: string): void {
    if (!this.socket || !this.currentRoomId) return;

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
    if (!this.socket || !this.currentRoomId) return;

    this.socket.emit('message_deleted', {
      messageId,
      roomId: this.currentRoomId,
    });
  }

  /**
   * Notify that user is typing
   */
  startTyping(): void {
    if (!this.socket || !this.currentRoomId) return;

    this.socket.emit('user_typing', {
      roomId: this.currentRoomId,
      userId: this.userId,
      userName: this.userName,
      isTyping: true,
    });
  }

  /**
   * Notify that user stopped typing
   */
  stopTyping(): void {
    if (!this.socket || !this.currentRoomId) return;

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
    if (!this.socket || !this.currentRoomId) return;

    this.socket.emit('message_reaction', {
      roomId: this.currentRoomId,
      messageId,
      userId: this.userId,
      emoji,
    });
  }

  /**
   * Setup event listeners for messages and updates
   */
  setupMessageListeners(callbacks: {
    onMessage?: (message: ChatMessage) => void;
    onMessageEdited?: (data: any) => void;
    onMessageDeleted?: (data: any) => void;
    onUserTyping?: (user: UserPresence) => void;
    onUserStoppedTyping?: (user: UserPresence) => void;
    onUserJoined?: (data: any) => void;
    onUserLeft?: (data: any) => void;
    onMessageReaction?: (data: any) => void;
    onRoomJoined?: (data: any) => void;
    onError?: (error: any) => void;
  }): void {
    if (!this.socket) return;

    if (callbacks.onMessage) {
      this.socket.on('new_message', callbacks.onMessage);
    }

    if (callbacks.onMessageEdited) {
      this.socket.on('message_edited', callbacks.onMessageEdited);
    }

    if (callbacks.onMessageDeleted) {
      this.socket.on('message_deleted', callbacks.onMessageDeleted);
    }

    if (callbacks.onUserTyping) {
      this.socket.on('user_typing', callbacks.onUserTyping);
    }

    if (callbacks.onUserStoppedTyping) {
      this.socket.on('user_stopped_typing', callbacks.onUserStoppedTyping);
    }

    if (callbacks.onUserJoined) {
      this.socket.on('user_joined', callbacks.onUserJoined);
    }

    if (callbacks.onUserLeft) {
      this.socket.on('user_left', callbacks.onUserLeft);
    }

    if (callbacks.onMessageReaction) {
      this.socket.on('message_reaction', callbacks.onMessageReaction);
    }

    if (callbacks.onRoomJoined) {
      this.socket.on('room_joined', callbacks.onRoomJoined);
    }

    if (callbacks.onError) {
      this.socket.on('error', callbacks.onError);
    }
  }

  /**
   * Disconnect from server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Get current room ID
   */
  getCurrentRoom(): string | null {
    return this.currentRoomId;
  }

  /**
   * Get socket instance (for advanced usage)
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Export singleton instance
export const chatSocketService = new ChatSocketService();
