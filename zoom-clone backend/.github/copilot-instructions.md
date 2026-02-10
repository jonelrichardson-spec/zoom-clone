<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Zoom Clone Backend - Chat Service

This is a Node.js/Express TypeScript backend for a Zoom clone application with real-time chat functionality.

## Project Overview

- **Language**: TypeScript
- **Framework**: Express.js
- **Real-time Communication**: Socket.IO
- **Architecture**: Service-based with controllers, services, routes, and models

## Directory Structure

```
src/
├── models/          # Data models and interfaces (Chat.ts)
├── services/        # Business logic (ChatService.ts, SocketIOService.ts)
├── controllers/     # REST API controllers (ChatController.ts)
├── routes/          # API routes (chatRoutes.ts)
├── middleware/      # Express middleware
├── utils/           # Utility functions
└── server.ts        # Main application entry point
```

## Key Features to Implement

1. **Chat Messaging**: Real-time message sending/receiving via WebSocket
2. **Typing Indicators**: Show when users are typing
3. **Message Reactions**: Emoji reactions to messages
4. **User Presence**: Track online/offline status
5. **Room Management**: Create and manage chat rooms
6. **Message History**: Retrieve past messages with pagination

## Important Guidelines

### Code Style
- Use TypeScript strict mode for type safety
- Follow functional programming patterns where applicable
- Use consistent error handling with try-catch blocks
- Document complex logic with JSDoc comments

### WebSocket Events
- Use the `MessageEventType` enum for consistency
- All socket handlers should validate user authentication
- Implement proper error responses for invalid operations

### Database Integration
- Currently using in-memory storage for development
- Replace with a real database (PostgreSQL, MongoDB, etc.) for production
- Create a repository pattern for data access

### Testing
- Add unit tests for services
- Add integration tests for API endpoints
- Consider adding Socket.IO client library for testing real-time features

### Performance Considerations
- Implement message pagination to avoid loading all messages at once
- Clear old typing indicators periodically
- Consider adding caching for frequently accessed data

## Development Commands

- `npm run dev` - Start development server with ts-node
- `npm run dev:watch` - Start with nodemon for auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript

## Environment Variables

Create a `.env` file based on `.env.example`:
- `PORT` - Server port (default: 3001)
- `HOST` - Server host (default: localhost)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Frontend URL for CORS
- Database configuration (for future use)
- JWT configuration (for authentication)

## Common Tasks

- **Add new chat feature**: Create model interface in `models/Chat.ts`, implement service logic in `services/ChatService.ts`, add controller method in `controllers/ChatController.ts`, add route in `routes/chatRoutes.ts`, and add socket handler in `services/SocketIOService.ts`
- **Fix TypeScript errors**: Always properly type request parameters with `Array.isArray()` checks
- **Update Socket.IO handlers**: Add both the server handler and ensure the client library sends the correct event

## Database Considerations

When replacing in-memory storage with a database:
1. Create database models/migrations
2. Create a repository/data access layer
3. Update service methods to use the database
4. Add connection pooling for performance
5. Implement proper error handling for database operations
