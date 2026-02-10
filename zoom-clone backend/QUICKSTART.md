# Quick Start Guide - Chat Backend

Get the Zoom Clone chat backend running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Terminal/command line

## Installation

### 1. Install Dependencies
```bash
npm install
```

This installs:
- **express** - Web server framework
- **socket.io** - Real-time WebSocket communication
- **cors** - Cross-Origin Resource Sharing
- **uuid** - Unique ID generation
- **typescript** - Type safety
- **ts-node** - Run TypeScript directly
- **nodemon** - Auto-reload on file changes

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` if needed (defaults are fine for local development):
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. Start Development Server
```bash
npm run dev:watch
```

You'll see:
```
🚀 Chat Server Running
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 URL: http://localhost:3001
🌍 CORS Origin: http://localhost:3000
🔧 Environment: development
🔌 WebSocket: Enabled (Socket.IO)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## API Endpoints

### Health Check
```bash
curl http://localhost:3001/health
```

### Create Chat Room
```bash
curl -X POST http://localhost:3001/api/chat/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "meetingId": "meeting-123",
    "roomName": "General Chat",
    "userId": "user-123"
  }'
```

### Get Room Messages
```bash
curl http://localhost:3001/api/chat/rooms/ROOM_ID/messages?limit=50&offset=0
```

## WebSocket Events (Real-Time Chat)

### Connect to WebSocket
```javascript
// JavaScript client
const socket = io('http://localhost:3001');

// Authenticate user
socket.emit('user_connected', {
  userId: 'user-123',
  userName: 'John Doe',
  userAvatar: 'https://...'
});

// Join a room
socket.emit('join_room', {
  roomId: 'room-123',
  meetingId: 'meeting-123'
});
```

### Send Message
```javascript
socket.emit('new_message', {
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  content: 'Hello!',
  timestamp: new Date()
});
```

### Listen for Messages
```javascript
socket.on('new_message', (message) => {
  console.log(`${message.userName}: ${message.content}`);
});
```

## Project Structure

```
src/
├── models/Chat.ts           # TypeScript interfaces
├── services/
│   ├── ChatService.ts       # Business logic
│   └── SocketIOService.ts   # WebSocket handlers
├── controllers/ChatController.ts  # API endpoints
├── routes/chatRoutes.ts     # API routes
└── server.ts                # Main app entry
```

## Development Commands

```bash
# Start with auto-reload
npm run dev:watch

# Start without auto-reload
npm run dev

# Build TypeScript
npm run build

# Run compiled code
npm start

# Watch TypeScript compilation
npm run watch
```

## Testing

### Manual Testing with cURL

**Create a room:**
```bash
curl -X POST http://localhost:3001/api/chat/rooms \
  -H "Content-Type: application/json" \
  -d '{"meetingId":"m1","roomName":"Test","userId":"u1"}'
```

**Get room details:**
```bash
curl http://localhost:3001/api/chat/rooms/ROOM_ID
```

### Manual Testing with WebSocket

Use a WebSocket client like [Postman](https://www.postman.com/) or [Socket.IO Tester](https://socket.io/tools/socket-io-debug-client/)

1. Connect to: `ws://localhost:3001`
2. Emit event: `user_connected`
3. Emit event: `join_room`
4. Emit event: `new_message`
5. Listen for events in real-time

## Common Issues

### Port 3001 Already in Use
```bash
# Kill the process on macOS/Linux:
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env
PORT=3002
```

### CORS Errors
Make sure `CORS_ORIGIN` in `.env` matches your frontend URL:
```env
CORS_ORIGIN=http://localhost:3000
```

### WebSocket Won't Connect
1. Check backend is running: `curl http://localhost:3001/health`
2. Check frontend `CORS_ORIGIN` setting
3. Ensure transports include both 'websocket' and 'polling'

## Next Steps

1. **Integrate with Frontend**
   - See `FRONTEND_INTEGRATION.md` for detailed integration guide
   - Frontend repo: https://github.com/jonelrichardson-spec/zoom-clone

2. **Add Database**
   - Replace in-memory storage with PostgreSQL/MongoDB
   - See README.md for database migration guide

3. **Add Authentication**
   - Implement JWT tokens
   - Add middleware to verify user connections
   - Secure WebSocket events

4. **Deployment**
   - Build: `npm run build`
   - Deploy to Railway, Heroku, AWS, GCP, or Azure
   - Update `CORS_ORIGIN` to production frontend URL

## Useful Resources

- 📚 [Socket.IO Documentation](https://socket.io/docs/)
- 🌐 [Express.js Guide](https://expressjs.com/)
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🚀 [Node.js Best Practices](https://nodejs.org/en/docs/)

## Support

Having issues? Check:
1. Error logs in terminal
2. Browser console for client-side errors
3. README.md for full documentation
4. FRONTEND_INTEGRATION.md for integration issues

---

**Happy coding! 🎉**


### Option C: Production Build
```bash
npm run build
npm start
```

## Expected Output

When the server starts, you should see:

```
🚀 Chat Server Running
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 URL: http://localhost:3001
🌍 CORS Origin: http://localhost:3000
🔧 Environment: development
🔌 WebSocket: Enabled (Socket.IO)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Testing the Server

### 1. Test REST API
Open your browser or use curl:
```bash
# Health check
curl http://localhost:3001/health

# Server info
curl http://localhost:3001/
```

### 2. Test WebSocket (Using Socket.IO Client)

Install Socket.IO client in your frontend:
```bash
npm install socket.io-client
```

See `FRONTEND_INTEGRATION.md` for complete integration example.

## API Quick Reference

### Create a Chat Room
```bash
curl -X POST http://localhost:3001/api/chat/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "meetingId": "meeting-123",
    "roomName": "General Chat",
    "userId": "user-123"
  }'
```

### Get Messages
```bash
curl http://localhost:3001/api/chat/rooms/ROOM_ID/messages?limit=50
```

### Get Room Details
```bash
curl http://localhost:3001/api/chat/rooms/ROOM_ID
```

## WebSocket Quick Example

```javascript
import { io } from 'socket.io-client';

// Connect
const socket = io('http://localhost:3001');

// Authenticate
socket.emit('user_connected', {
  userId: 'user-123',
  userName: 'John Doe',
  userAvatar: 'https://example.com/avatar.jpg'
});

// Join room
socket.emit('join_room', {
  roomId: 'room-123',
  meetingId: 'meeting-123'
});

// Send message
socket.emit('new_message', {
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  content: 'Hello everyone!',
  timestamp: new Date()
});

// Listen for messages
socket.on('new_message', (message) => {
  console.log('New message:', message);
});

// Typing indicator
socket.emit('user_typing', {
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  isTyping: true
});

// Stop typing
socket.emit('user_stopped_typing', {
  roomId: 'room-123',
  userId: 'user-123',
  userName: 'John Doe',
  isTyping: false
});
```

## Troubleshooting

### Port Already in Use
If port 3001 is in use, change it in `.env`:
```
PORT=3002
```

### CORS Errors
Update `CORS_ORIGIN` in `.env` to match your frontend URL:
```
CORS_ORIGIN=http://localhost:3000
```

### Module Not Found
Make sure dependencies are installed:
```bash
npm install
```

### TypeScript Errors
Rebuild the project:
```bash
npm run build
```

## Next Steps

1. **Integrate with Frontend**: Use `FRONTEND_INTEGRATION.md` as a guide
2. **Add Authentication**: Implement JWT token validation
3. **Setup Database**: Replace in-memory storage with PostgreSQL/MongoDB
4. **Add Tests**: Create unit and integration tests
5. **Deploy**: Deploy to production (Heroku, AWS, etc.)

## Available Commands

```bash
npm run dev          # Start development server
npm run dev:watch    # Start with auto-reload
npm run build        # Compile TypeScript
npm run watch        # Watch TypeScript changes
npm start            # Run compiled JavaScript
```

## Project Structure

```
src/
├── server.ts                 # Main app entry
├── controllers/ChatController.ts    # API handlers
├── services/
│   ├── ChatService.ts       # Business logic
│   └── SocketIOService.ts   # WebSocket handlers
├── routes/chatRoutes.ts      # API routes
└── models/Chat.ts            # TypeScript types
```

## Documentation

- **API Endpoints**: See `README.md`
- **WebSocket Events**: See `README.md`
- **Frontend Integration**: See `FRONTEND_INTEGRATION.md`
- **Project Setup**: See `.github/copilot-instructions.md`

## Support

- Check logs in terminal for errors
- Verify `.env` configuration
- Review API request/response formats
- Check WebSocket connection in browser DevTools

---

🎉 Your Zoom Clone Chat Backend is now running!
