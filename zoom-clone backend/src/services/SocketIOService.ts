/**
 * Socket.IO Service
 * Handles WebSocket connections and real-time communication
 */
import { Server, Socket } from 'socket.io';
import { chatService } from './ChatService';
import {
  MessageEventType,
  NewMessagePayload,
  TypingPayload,
  ReactionPayload,
} from '../models/Chat';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userName?: string;
  userAvatar?: string;
}

export class SocketIOService {
  private io: Server;
  private userSockets: Map<string, Set<string>> = new Map(); // userId -> set of socket IDs

  constructor(io: Server) {
    this.io = io;
  }

  /**
   * Initialize socket handlers
   */
  initialize(): void {
    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`[Socket] User connected: ${socket.id}`);

      // Message handlers
      socket.on(MessageEventType.NEW_MESSAGE, this.handleNewMessage.bind(this, socket));
      socket.on(MessageEventType.MESSAGE_EDITED, this.handleEditMessage.bind(this, socket));
      socket.on(MessageEventType.MESSAGE_DELETED, this.handleDeleteMessage.bind(this, socket));
      socket.on(MessageEventType.USER_TYPING, this.handleUserTyping.bind(this, socket));
      socket.on(MessageEventType.USER_STOPPED_TYPING, this.handleUserStoppedTyping.bind(this, socket));
      socket.on(MessageEventType.MESSAGE_REACTION, this.handleReaction.bind(this, socket));

      // Room handlers
      socket.on('join_room', this.handleJoinRoom.bind(this, socket));
      socket.on('leave_room', this.handleLeaveRoom.bind(this, socket));
      socket.on('user_connected', this.handleUserConnected.bind(this, socket));

      // Disconnect handler
      socket.on('disconnect', this.handleDisconnect.bind(this, socket));
    });
  }

  /**
   * Handle user connection and authentication
   */
  private handleUserConnected(socket: AuthenticatedSocket, data: any): void {
    const { userId, userName, userAvatar } = data;

    socket.userId = userId;
    socket.userName = userName;
    socket.userAvatar = userAvatar;

    // Track socket connection
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId)!.add(socket.id);

    console.log(`[Socket] User authenticated: ${userName} (${userId})`);
    socket.emit('user_connected_ack', { success: true });
  }

  /**
   * Handle joining a chat room
   */
  private handleJoinRoom(socket: AuthenticatedSocket, data: any): void {
    const { roomId, meetingId } = data;

    if (!socket.userId) {
      socket.emit('error', { message: 'Not authenticated' });
      return;
    }

    // Join the socket to the room
    socket.join(roomId);

    // Add participant to the room
    chatService.addParticipant(roomId, socket.userId);

    // Get recent messages
    const recentMessages = chatService.getMessages(roomId, 50);

    // Notify others that a user joined
    this.io.to(roomId).emit(MessageEventType.USER_JOINED, {
      userId: socket.userId,
      userName: socket.userName,
      timestamp: new Date(),
    });

    // Send join confirmation to the user
    socket.emit('room_joined', {
      roomId,
      recentMessages,
      participants: chatService.getRoom(roomId)?.participants || [],
    });

    console.log(`[Socket] User ${socket.userName} joined room ${roomId}`);
  }

  /**
   * Handle leaving a chat room
   */
  private handleLeaveRoom(socket: AuthenticatedSocket, data: any): void {
    const { roomId } = data;

    if (!socket.userId) return;

    socket.leave(roomId);
    chatService.removeParticipant(roomId, socket.userId);

    this.io.to(roomId).emit(MessageEventType.USER_LEFT, {
      userId: socket.userId,
      userName: socket.userName,
      timestamp: new Date(),
    });

    console.log(`[Socket] User ${socket.userName} left room ${roomId}`);
  }

  /**
   * Handle new message
   */
  private handleNewMessage(socket: AuthenticatedSocket, payload: NewMessagePayload): void {
    if (!socket.userId) {
      socket.emit('error', { message: 'Not authenticated' });
      return;
    }

    const message = chatService.saveMessage(
      payload.roomId,
      socket.userId,
      socket.userName || 'Anonymous',
      payload.content,
      socket.userAvatar
    );

    if (!message) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }

    // Broadcast message to all users in the room
    this.io.to(payload.roomId).emit(MessageEventType.NEW_MESSAGE, {
      id: message.id,
      roomId: message.roomId,
      userId: message.userId,
      userName: message.userName,
      userAvatar: message.userAvatar,
      content: message.content,
      timestamp: message.timestamp,
    });

    console.log(
      `[Socket] New message in room ${payload.roomId}: ${payload.content.substring(0, 50)}`
    );
  }

  /**
   * Handle message edit
   */
  private handleEditMessage(socket: AuthenticatedSocket, data: any): void {
    if (!socket.userId) return;

    const { messageId, roomId, content } = data;

    const message = chatService.editMessage(messageId, roomId, content);

    if (!message) {
      socket.emit('error', { message: 'Message not found' });
      return;
    }

    this.io.to(roomId).emit(MessageEventType.MESSAGE_EDITED, {
      messageId: message.id,
      roomId: message.roomId,
      content: message.content,
      editedAt: message.editedAt,
    });

    console.log(`[Socket] Message ${messageId} edited in room ${roomId}`);
  }

  /**
   * Handle message delete
   */
  private handleDeleteMessage(socket: AuthenticatedSocket, data: any): void {
    if (!socket.userId) return;

    const { messageId, roomId } = data;

    const deleted = chatService.deleteMessage(messageId, roomId);

    if (!deleted) {
      socket.emit('error', { message: 'Message not found' });
      return;
    }

    this.io.to(roomId).emit(MessageEventType.MESSAGE_DELETED, {
      messageId,
      roomId,
      deletedAt: new Date(),
    });

    console.log(`[Socket] Message ${messageId} deleted from room ${roomId}`);
  }

  /**
   * Handle user typing indicator
   */
  private handleUserTyping(socket: AuthenticatedSocket, payload: TypingPayload): void {
    if (!socket.userId) return;

    chatService.updateUserPresence(socket.userId, payload.roomId, true);

    socket.to(payload.roomId).emit(MessageEventType.USER_TYPING, {
      userId: socket.userId,
      userName: socket.userName,
      roomId: payload.roomId,
    });
  }

  /**
   * Handle user stopped typing
   */
  private handleUserStoppedTyping(socket: AuthenticatedSocket, payload: TypingPayload): void {
    if (!socket.userId) return;

    chatService.updateUserPresence(socket.userId, payload.roomId, false);

    socket.to(payload.roomId).emit(MessageEventType.USER_STOPPED_TYPING, {
      userId: socket.userId,
      userName: socket.userName,
      roomId: payload.roomId,
    });
  }

  /**
   * Handle message reaction (emoji)
   */
  private handleReaction(socket: AuthenticatedSocket, payload: ReactionPayload): void {
    if (!socket.userId) return;

    const message = chatService.addReaction(
      payload.messageId,
      payload.roomId,
      socket.userId,
      payload.emoji
    );

    if (!message) {
      socket.emit('error', { message: 'Message not found' });
      return;
    }

    this.io.to(payload.roomId).emit(MessageEventType.MESSAGE_REACTION, {
      messageId: payload.messageId,
      roomId: payload.roomId,
      userId: socket.userId,
      emoji: payload.emoji,
      reactions: message.reactions,
    });

    console.log(
      `[Socket] Reaction ${payload.emoji} added to message ${payload.messageId}`
    );
  }

  /**
   * Handle user disconnect
   */
  private handleDisconnect(socket: AuthenticatedSocket): void {
    if (socket.userId) {
      const sockets = this.userSockets.get(socket.userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          this.userSockets.delete(socket.userId);
        }
      }
    }

    console.log(`[Socket] User disconnected: ${socket.id}`);
  }

  /**
   * Emit message to a specific room
   */
  emitToRoom(roomId: string, event: string, data: any): void {
    this.io.to(roomId).emit(event, data);
  }

  /**
   * Emit message to a specific user (all their sockets)
   */
  emitToUser(userId: string, event: string, data: any): void {
    const sockets = this.userSockets.get(userId);
    if (sockets) {
      sockets.forEach((socketId) => {
        this.io.to(socketId).emit(event, data);
      });
    }
  }
}
