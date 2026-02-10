/**
 * Chat Sidebar Component
 * Real-time chat UI for the video call interface
 * 
 * Place this file in: frontend/app/components/ChatSidebar.tsx
 * Usage: <ChatSidebar roomId={roomId} userId={userId} userName={userName} />
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@/app/hooks/useChat';
import { format } from 'date-fns';

interface ChatSidebarProps {
  roomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
}

const EMOJI_REACTIONS = ['👍', '❤️', '😂', '🔥', '👀', '🎉', '😍', '🤔'];

export function ChatSidebar({ roomId, userId, userName, userAvatar }: ChatSidebarProps) {
  const { messages, sendMessage, onTyping, addReaction, typingUsers, isConnected, error } =
    useChat(roomId, { userId, userName, userAvatar });

  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onTyping();
  };

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  // Start editing a message
  const startEditMessage = (messageId: string, currentContent: string) => {
    setEditingId(messageId);
    setEditContent(currentContent);
  };

  // Handle emoji reaction
  const handleEmojiReaction = (messageId: string, emoji: string) => {
    addReaction(messageId, emoji);
    setShowEmojiPicker(null);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return format(new Date(date), 'HH:mm');
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <h2 className="text-lg font-semibold text-white">Chat</h2>
        <p className="text-sm text-gray-400">
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              No messages yet.<br />
              Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="group">
              <div className="flex gap-2">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                  {message.userName.charAt(0).toUpperCase()}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{message.userName}</span>
                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    {message.edited && <span className="text-xs text-gray-500">(edited)</span>}
                  </div>

                  {/* Message Text */}
                  <p className="text-sm text-gray-200 mt-1 break-words">{message.content}</p>

                  {/* Message Reactions */}
                  {message.reactions && Object.keys(message.reactions).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(message.reactions).map(([emoji, users]) => (
                        <button
                          key={emoji}
                          onClick={() => handleEmojiReaction(message.id, emoji)}
                          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                          title={users.join(', ')}
                        >
                          {emoji} {users.length}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Message Actions (show on hover) */}
                  <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Emoji Reaction Button */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowEmojiPicker(
                            showEmojiPicker === message.id ? null : message.id
                          )
                        }
                        className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        title="Add reaction"
                      >
                        😊
                      </button>

                      {/* Emoji Picker Popup */}
                      {showEmojiPicker === message.id && (
                        <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded p-2 z-50 flex flex-wrap gap-1 w-max">
                          {EMOJI_REACTIONS.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => handleEmojiReaction(message.id, emoji)}
                              className="text-xl hover:scale-125 transition-transform"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Only show edit/delete for own messages */}
                    {message.userId === userId && (
                      <>
                        <button
                          onClick={() => startEditMessage(message.id, message.content)}
                          className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                          title="Edit message"
                        >
                          ✏️
                        </button>
                        {/* Delete would be implemented similarly */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing Indicators */}
        {typingUsers.length > 0 && (
          <div className="text-xs text-gray-500 italic">
            {typingUsers.map((u) => u.userName).join(', ')}{' '}
            {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-2 bg-red-900/50 border-t border-red-700 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800">
        {editingId ? (
          // Edit mode
          <div className="space-y-2 mb-4 p-3 bg-gray-700 rounded">
            <p className="text-xs text-gray-400">Editing message</p>
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-3 py-2 bg-gray-600 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  // TODO: Call editMessage here
                  setEditingId(null);
                  setEditContent('');
                }}
                className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setEditContent('');
                }}
                className="flex-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isConnected ? 'Type a message...' : 'Disconnected...'}
            disabled={!isConnected}
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />
          <button
            type="submit"
            disabled={!isConnected || !inputValue.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
