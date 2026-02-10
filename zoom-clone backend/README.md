# Zoom Clone Backend - Chat Service

A real-time chat backend service for the Zoom Clone application, built with Express.js, TypeScript, and Socket.IO.

## Features

✨ **Real-Time Messaging**
- Send and receive messages instantly via WebSocket
- Message persistence with in-memory storage (upgradeable to database)
- Message editing and deletion

💬 **Typing Indicators**
- Show when users are typing in a chat room
- Automatically clear old indicators

😊 **Emoji Reactions**
- Add emoji reactions to messages
- Multiple users can react to the same message

👥 **User Presence**
- Track user online/offline status
- Typing status per user

🏠 **Chat Rooms**
- Create chat rooms associated with meetings
- Manage room participants
- Get room message history

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Real-time**: Socket.IO
- **CORS**: cors middleware
- **Environment**: dotenv
- **Task Runner**: npm scripts
- **Development**: ts-node, nodemon, TypeScript

## Project Structure

```
zoom-clone backend/
├── src/
│   ├── models/              # Data models and TypeScript interfaces
│   │   └── Chat.ts         # Chat message, room, and event types
│   ├── services/            # Business logic
│   │   ├── ChatService.ts   # Chat management service
│   │   └── SocketIOService.ts # WebSocket handler service
│   ├── controllers/         # REST API request handlers
│   │   └── ChatController.ts
│   ├── routes/              # API route definitions
│   │   └── chatRoutes.ts
│   ├── middleware/          # Express middleware (for future use)
│   ├── utils/               # Utility functions (for future use)
│   └── server.ts            # Main application entry point
├── .github/
│   └── copilot-instructions.md
├── .vscode/
│   └── tasks.json          # VS Code build tasks
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env`** with your configuration:
   ```
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev:watch
```

### Development Mode (standard)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /` - Server info and status

### Chat Rooms
- `POST /api/chat/rooms` - Create a new chat room
  ```json
  {
    "meetingId": "meeting-123",
    "roomName": "General Chat",
    "userId": "user-123"
  }
  ```

- `GET /api/chat/rooms/:roomId` - Get room details
- `GET /api/chat/rooms/:roomId/messages?limit=50&offset=0` - Get messages
- `GET /api/chat/rooms/:roomId/typing` - Get typing users
- `POST /api/chat/rooms/:roomId/participants` - Add participant
- `DELETE /api/chat/rooms/:roomId/participants/:userId` - Remove participant

### Meetings
- `GET /api/chat/meetings/:meetingId/rooms` - Get all rooms for a meeting

## WebSocket Events

### Client → Server Events

**User Connection**
```javascript
socket.emit('user_connected', {
  userId: 'user-123',
  userName: 'John Doe',
  userAvatar: 'avatar-url'
});
```

**Join Room**
```javascript
socket.emit('join_room', {
  roomId: 'room-123',
  meetingId: 'meeting-123'
});
```

**Leave Room**
```javascript
socket.emit('leave_room', {
  roomId: 'room-123'
});
```

**Send Message**
```javascript
socket.emit('new_message', {
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  content: 'Hello everyone!',
  timestamp: new Date()
});
```

**Typing Indicator**
```javascript
socket.emit('user_typing', {
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  isTyping: true
});
```

**Stop Typing**
```javascript
socket.emit('user_stopped_typing', {
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  isTyping: false
});
```

**Add Reaction**
```javascript
socket.emit('message_reaction', {
  roomId: 'room-123',
  messageId: 'msg-123',
  userId: 'user-123',
  emoji: '👍'
});
```

**Edit Message**
```javascript
socket.emit('message_edited', {
  messageId: 'msg-123',
  roomId: 'room-123',
  content: 'Updated message'
});
```

**Delete Message**
```javascript
socket.emit('message_deleted', {
  messageId: 'msg-123',
  roomId: 'room-123'
});
```

### Server → Client Events

**User Joined**
```javascript
socket.on('user_joined', {
  userId: 'user-456',
  userName: 'Jane Doe',
  timestamp: Date
});
```

**User Left**
```javascript
socket.on('user_left', {
  userId: 'user-456',
  userName: 'Jane Doe',
  timestamp: Date
});
```

**New Message**
```javascript
socket.on('new_message', {
  id: 'msg-123',
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  userAvatar: 'avatar-url',
  content: 'Hello everyone!',
  timestamp: Date
});
```

**Message Edited**
```javascript
socket.on('message_edited', {
  messageId: 'msg-123',
  roomId: 'room-123',
  content: 'Updated message',
  editedAt: Date
});
```

**Message Deleted**
```javascript
socket.on('message_deleted', {
  messageId: 'msg-123',
  roomId: 'room-123',
  deletedAt: Date
});
```

**User Typing**
```javascript
socket.on('user_typing', {
  userId: 'user-456',
  userName: 'Jane Doe',
  roomId: 'room-123'
});
```

**User Stopped Typing**
```javascript
socket.on('user_stopped_typing', {
  userId: 'user-456',
  userName: 'Jane Doe',
  roomId: 'room-123'
});
```

**Message Reaction**
```javascript
socket.on('message_reaction', {
  messageId: 'msg-123',
  roomId: 'room-123',
  userId: 'user-456',
  emoji: '👍',
  reactions: {
    '👍': ['user-123', 'user-456'],
    '❤️': ['user-123']
  }
});
```

**Room Joined**
```javascript
socket.on('room_joined', {
  roomId: 'room-123',
  recentMessages: [...],
  participants: ['user-123', 'user-456']
});
```

**User Connected Acknowledgment**
```javascript
socket.on('user_connected_ack', {
  success: true
});
```

## Development

### Build TypeScript
```bash
npm run build
```

### Watch TypeScript
```bash
npm run watch
```

### Running Tests
Tests are not yet implemented. To add tests:
```bash
npm install --save-dev jest @types/jest ts-jest
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server
PORT=3001
NODE_ENV=development
HOST=localhost

# CORS
CORS_ORIGIN=http://localhost:3000

# Database (for future use)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=zoom_clone

# JWT (for authentication)
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=24h
```

## Future Enhancements

- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] Authentication and authorization (JWT)
- [ ] Message encryption
- [ ] File/image sharing
- [ ] Message threading/replies
- [ ] Search functionality
- [ ] Rate limiting
- [ ] Logging system
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] Kubernetes deployment

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

WebSocket errors are emitted as events:
```javascript
socket.on('error', {
  message: 'Error description'
});
```

## Performance Considerations

- Messages are paginated (default 50 per request)
- Typing indicators are automatically cleared after 5 seconds
- In-memory storage is suitable for development/testing
- For production: use a persistent database with indexing

## Deployment

### Docker (Future)
```bash
docker build -t zoom-clone-backend .
docker run -p 3001:3001 zoom-clone-backend
```

### Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### AWS/GCP/Azure
Refer to deployment documentation for your platform.

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for the Zoom Clone Project**
