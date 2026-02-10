/**
 * Chat Message Model
 * Represents a single message in the chat system
 */
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
  reactions?: Record<string, string[]>; // emoji -> [userId, ...]
}

/**
 * Chat Room Model
 * Represents a chat room (associated with a meeting/call)
 */
export interface ChatRoom {
  id: string;
  name: string;
  meetingId: string;
  createdAt: Date;
  participants: string[]; // user IDs
  messageCount: number;
  createdBy: string;
  archived?: boolean;
}

/**
 * User Presence Model
 * Tracks if a user is typing or their connection status
 */
export interface UserPresence {
  userId: string;
  roomId: string;
  isTyping: boolean;
  lastSeen: Date;
  isOnline: boolean;
}

/**
 * Message Event Types
 */
export enum MessageEventType {
  NEW_MESSAGE = 'new_message',
  MESSAGE_EDITED = 'message_edited',
  MESSAGE_DELETED = 'message_deleted',
  USER_TYPING = 'user_typing',
  USER_STOPPED_TYPING = 'user_stopped_typing',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  MESSAGE_REACTION = 'message_reaction',
}

/**
 * Socket Event Payload for New Message
 */
export interface NewMessagePayload {
  roomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
}

/**
 * Socket Event Payload for Typing Indicator
 */
export interface TypingPayload {
  roomId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

/**
 * Socket Event Payload for Message Reaction
 */
export interface ReactionPayload {
  roomId: string;
  messageId: string;
  userId: string;
  emoji: string;
}
