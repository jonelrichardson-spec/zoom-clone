/**
 * React Hook: useChat
 * Manages chat state and Socket.IO communication
 * 
 * Place this file in: frontend/app/hooks/useChat.ts
 * Usage in components: const { messages, sendMessage, ... } = useChat(roomId, userId, userName)
 */

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { chatSocketService, ChatMessage, UserPresence } from '@/app/lib/chat/socketService';

interface UseChatOptions {
  userId: string;
  userName: string;
  userAvatar?: string;
}

interface TypingUser {
  userId: string;
  userName: string;
  isTyping: boolean;
}

export function useChat(roomId: string, options: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, TypingUser>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize socket connection on mount
  useEffect(() => {
    // Connect to socket server
    chatSocketService.connect(options.userId, options.userName, options.userAvatar);

    // Setup message listeners
    chatSocketService.setupMessageListeners({
      onMessage: (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
      },

      onMessageEdited: (data: any) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.messageId
              ? { ...msg, content: data.content, edited: true, editedAt: new Date() }
              : msg
          )
        );
      },

      onMessageDeleted: (data: any) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== data.messageId));
      },

      onUserTyping: (user: UserPresence) => {
        setTypingUsers((prev) => new Map(prev).set(user.userId, { ...user, isTyping: true }));
      },

      onUserStoppedTyping: (user: UserPresence) => {
        setTypingUsers((prev) => {
          const newMap = new Map(prev);
          newMap.delete(user.userId);
          return newMap;
        });
      },

      onMessageReaction: (data: any) => {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === data.messageId) {
              const reactions = msg.reactions || {};
              const emoji = data.emoji;
              if (!reactions[emoji]) {
                reactions[emoji] = [];
              }
              if (!reactions[emoji].includes(data.userId)) {
                reactions[emoji].push(data.userId);
              }
              return { ...msg, reactions };
            }
            return msg;
          })
        );
      },

      onRoomJoined: (data: any) => {
        console.log('Room joined:', data);
        setIsConnected(true);
      },

      onError: (error: any) => {
        console.error('Chat error:', error);
        setError(error?.message || 'An error occurred');
      },
    });

    // Join the room
    chatSocketService.joinRoom(roomId);

    // Set connected state
    setIsConnected(chatSocketService.isConnected());

    // Cleanup on unmount
    return () => {
      chatSocketService.leaveRoom();
      // Note: Don't disconnect here if you want to persist connection across route changes
      // Only disconnect when user closes the app or logs out
    };
  }, [roomId, options.userId, options.userName, options.userAvatar]);

  // Send message handler
  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    chatSocketService.sendMessage(content);

    // Stop typing indicator when message is sent
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    chatSocketService.stopTyping();
  }, []);

  // Edit message handler
  const editMessage = useCallback((messageId: string, newContent: string) => {
    chatSocketService.editMessage(messageId, newContent);
  }, []);

  // Delete message handler
  const deleteMessage = useCallback((messageId: string) => {
    chatSocketService.deleteMessage(messageId);
  }, []);

  // Typing indicator handler
  const onTyping = useCallback(() => {
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Start typing
    chatSocketService.startTyping();

    // Auto-stop after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      chatSocketService.stopTyping();
    }, 3000);
  }, []);

  // Add reaction handler
  const addReaction = useCallback((messageId: string, emoji: string) => {
    chatSocketService.addReaction(messageId, emoji);
  }, []);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    messages,
    sendMessage,
    editMessage,
    deleteMessage,
    onTyping,
    addReaction,
    typingUsers: Array.from(typingUsers.values()),
    isConnected,
    error,
    clearError: () => setError(null),
  };
}
