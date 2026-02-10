/**
 * Chat Service
 * Handles all chat-related business logic
 */
import { ChatMessage, ChatRoom, UserPresence, MessageEventType } from '../models/Chat';
import { v4 as uuidv4 } from 'uuid';

export class ChatService {
  // In-memory storage (replace with database in production)
  private messages: Map<string, ChatMessage[]> = new Map();
  private rooms: Map<string, ChatRoom> = new Map();
  private userPresence: Map<string, UserPresence> = new Map();

  /**
   * Create a new chat room
   */
  createRoom(meetingId: string, roomName: string, userId: string): ChatRoom {
    const roomId = uuidv4();
    const room: ChatRoom = {
      id: roomId,
      name: roomName,
      meetingId,
      createdAt: new Date(),
      participants: [userId],
      messageCount: 0,
      createdBy: userId,
      archived: false,
    };

    this.rooms.set(roomId, room);
    this.messages.set(roomId, []);
    return room;
  }

  /**
   * Get chat room by ID
   */
  getRoom(roomId: string): ChatRoom | undefined {
    return this.rooms.get(roomId);
  }

  /**
   * Get all rooms for a meeting
   */
  getRoomsByMeeting(meetingId: string): ChatRoom[] {
    return Array.from(this.rooms.values()).filter(
      (room) => room.meetingId === meetingId
    );
  }

  /**
   * Add a participant to a room
   */
  addParticipant(roomId: string, userId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
    }
    return true;
  }

  /**
   * Remove a participant from a room
   */
  removeParticipant(roomId: string, userId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    room.participants = room.participants.filter((id) => id !== userId);
    return true;
  }

  /**
   * Save a new message
   */
  saveMessage(
    roomId: string,
    userId: string,
    userName: string,
    content: string,
    userAvatar?: string
  ): ChatMessage | null {
    if (!this.rooms.has(roomId)) return null;

    const message: ChatMessage = {
      id: uuidv4(),
      roomId,
      userId,
      userName,
      userAvatar,
      content,
      timestamp: new Date(),
      edited: false,
    };

    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, []);
    }

    this.messages.get(roomId)!.push(message);

    // Update message count
    const room = this.rooms.get(roomId)!;
    room.messageCount++;

    return message;
  }

  /**
   * Get messages for a room (with pagination)
   */
  getMessages(roomId: string, limit: number = 50, offset: number = 0): ChatMessage[] {
    const roomMessages = this.messages.get(roomId) || [];
    return roomMessages.slice(-limit - offset, -offset || undefined).reverse();
  }

  /**
   * Edit a message
   */
  editMessage(messageId: string, roomId: string, newContent: string): ChatMessage | null {
    const messages = this.messages.get(roomId);
    if (!messages) return null;

    const message = messages.find((m) => m.id === messageId);
    if (!message) return null;

    message.content = newContent;
    message.edited = true;
    message.editedAt = new Date();

    return message;
  }

  /**
   * Delete a message
   */
  deleteMessage(messageId: string, roomId: string): boolean {
    const messages = this.messages.get(roomId);
    if (!messages) return false;

    const index = messages.findIndex((m) => m.id === messageId);
    if (index === -1) return false;

    messages.splice(index, 1);
    return true;
  }

  /**
   * Add a reaction to a message
   */
  addReaction(messageId: string, roomId: string, userId: string, emoji: string): ChatMessage | null {
    const messages = this.messages.get(roomId);
    if (!messages) return null;

    const message = messages.find((m) => m.id === messageId);
    if (!message) return null;

    if (!message.reactions) {
      message.reactions = {};
    }

    if (!message.reactions[emoji]) {
      message.reactions[emoji] = [];
    }

    if (!message.reactions[emoji].includes(userId)) {
      message.reactions[emoji].push(userId);
    }

    return message;
  }

  /**
   * Remove a reaction from a message
   */
  removeReaction(messageId: string, roomId: string, userId: string, emoji: string): ChatMessage | null {
    const messages = this.messages.get(roomId);
    if (!messages) return null;

    const message = messages.find((m) => m.id === messageId);
    if (!message || !message.reactions) return null;

    if (message.reactions[emoji]) {
      message.reactions[emoji] = message.reactions[emoji].filter(
        (id) => id !== userId
      );

      if (message.reactions[emoji].length === 0) {
        delete message.reactions[emoji];
      }
    }

    return message;
  }

  /**
   * Update user presence (typing status)
   */
  updateUserPresence(
    userId: string,
    roomId: string,
    isTyping: boolean
  ): UserPresence {
    const key = `${roomId}:${userId}`;
    const presence: UserPresence = {
      userId,
      roomId,
      isTyping,
      lastSeen: new Date(),
      isOnline: true,
    };

    this.userPresence.set(key, presence);
    return presence;
  }

  /**
   * Get users currently typing in a room
   */
  getTypingUsers(roomId: string): UserPresence[] {
    return Array.from(this.userPresence.values()).filter(
      (p) => p.roomId === roomId && p.isTyping
    );
  }

  /**
   * Get user presence
   */
  getUserPresence(userId: string, roomId: string): UserPresence | undefined {
    return this.userPresence.get(`${roomId}:${userId}`);
  }

  /**
   * Clear old typing indicators (older than 5 seconds)
   */
  clearOldTypingIndicators(): void {
    const now = new Date().getTime();
    const threshold = 5000; // 5 seconds

    for (const [key, presence] of this.userPresence.entries()) {
      if (now - presence.lastSeen.getTime() > threshold) {
        this.userPresence.delete(key);
      }
    }
  }
}

// Export singleton instance
export const chatService = new ChatService();
