# 🚀 Integration Deploy Package

This folder contains all the files and scripts needed to integrate chat into your Next.js frontend!

## 📦 What's Inside

```
INTEGRATION_DEPLOY/
├── socketService.ts           ✨ Socket.IO client wrapper
├── useChat.ts                 ✨ React hook for chat
├── ChatSidebar.tsx            ✨ Chat UI component
├── RoomPageExample.tsx        📖 Integration example
├── deploy.py                  🤖 Automatic deployment script
├── DEPLOYMENT_GUIDE.md        📚 Complete setup guide
└── README.md                  📄 This file
```

## ⚡ Quick Start (30 seconds)

### Option 1: Automatic Deployment (Recommended)

```bash
python3 INTEGRATION_DEPLOY/deploy.py ~/zoom-clone-frontend
```

That's it! The script will:
- ✅ Create required directories
- ✅ Copy all 4 integration files
- ✅ Create .env.local
- ✅ Create quick-start guide

### Option 2: Manual Copy

```bash
# Create directories
mkdir -p frontend/app/lib/chat
mkdir -p frontend/app/hooks
mkdir -p frontend/app/components

# Copy files
cp INTEGRATION_DEPLOY/socketService.ts frontend/app/lib/chat/
cp INTEGRATION_DEPLOY/useChat.ts frontend/app/hooks/
cp INTEGRATION_DEPLOY/ChatSidebar.tsx frontend/app/components/

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > frontend/.env.local
```

## 📖 Setup Steps After Deployment

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install socket.io-client date-fns
   ```

2. **Update Room Page** (`app/room/[roomId]/page.tsx`)
   ```typescript
   import { ChatSidebar } from '@/app/components/ChatSidebar';

   // Add state
   const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
   const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);

   // Update JSX
   return (
     <div className="flex h-screen">
       <div className="flex-1">{/* video */}</div>
       <div className="w-80">
         <ChatSidebar roomId={roomId} userId={userId} userName={userName} />
       </div>
     </div>
   );
   ```

   See `RoomPageExample.tsx` for complete example!

3. **Start Servers**
   ```bash
   # Terminal 1: Backend
   npm run dev:watch

   # Terminal 2: Frontend
   npm run dev
   ```

4. **Test**
   - Open http://localhost:3000
   - Create meeting
   - Chat appears on right sidebar ✨

## 📋 File Details

### socketService.ts (307 lines)
**Socket.IO client wrapper for WebSocket communication**
- Singleton pattern
- Auto-reconnection
- Event management
- Type-safe interfaces

Key methods:
- `connect(userId, userName)` - Initialize connection
- `joinRoom(roomId)` - Join chat room
- `sendMessage(content)` - Send message
- `addReaction(messageId, emoji)` - Add emoji reaction

### useChat.ts (175 lines)
**React hook for chat state management**

Returns object with:
- `messages` - Array of ChatMessage
- `sendMessage(content)` - Send message
- `typingUsers` - Who's typing
- `isConnected` - Connection status
- `addReaction(messageId, emoji)` - React to message
- `error` - Error message if any

### ChatSidebar.tsx (360 lines)
**Complete chat UI component**

Features:
- Real-time message display
- User avatars
- Emoji reaction picker (8 emojis)
- Typing indicators
- Dark theme
- Auto-scroll
- Connection status
- Message timestamps
- Responsive design

Props:
```typescript
<ChatSidebar
  roomId={string}
  userId={string}
  userName={string}
  userAvatar={string}  // optional
/>
```

### RoomPageExample.tsx (275 lines)
**Complete working example of room page with video + chat**

Shows:
- Full PeerJS video setup
- Chat integration
- Split-screen layout
- Media controls
- Error handling

Copy this structure into your `app/room/[roomId]/page.tsx`!

### deploy.py
**Automatic deployment script**

Usage:
```bash
python3 deploy.py /path/to/frontend
```

Does:
1. Creates directories
2. Copies all files
3. Creates .env.local
4. Creates quick-start guide

## 🔧 Customization Guide

### Change Sidebar Width
```tsx
<div className="w-80">  {/* Change 80 to 96 for wider, 64 for narrower */}
```

### Change Emoji Reactions
In `ChatSidebar.tsx`:
```typescript
const EMOJI_REACTIONS = ['👍', '❤️', '😂', '🔥', '👀', '🎉', '😍', '🤔'];
// Customize as needed
```

### Change Theme Colors
```typescript
// In ChatSidebar.tsx
className="bg-gray-900"  // Change bg-color
className="text-white"   // Change text-color
```

### Use Real User Data
```typescript
// Instead of random:
const [userId] = useState(() => session?.user?.id || 'guest');
const [userName] = useState(() => session?.user?.name || 'Guest');
```

## 🐛 Troubleshooting

### "Cannot find module 'socket.io-client'"
```bash
npm install socket.io-client date-fns
```

### "Cannot reach localhost:3001"
- Check backend running: `npm run dev:watch`
- Check .env.local has correct URL
- Check firewall not blocking port 3001

### Chat doesn't appear
- Verify ChatSidebar imported in room page
- Check file paths match your structure
- Check browser console (F12) for errors

### Messages don't send
- Check DevTools → Console for JS errors
- Check DevTools → Network → WS for WebSocket
- Verify connection shows "🟢 Connected"

## ✨ Features

✅ Real-time messaging  
✅ Typing indicators  
✅ Emoji reactions  
✅ User presence  
✅ Message timestamps  
✅ Dark theme  
✅ Responsive  
✅ Error handling  
✅ Auto-scroll  
✅ Type-safe TypeScript  

## 🎯 Architecture

```
Frontend (Next.js/React)
├── ChatSidebar (UI)
│   └── useChat (State)
│       └── socketService (WebSocket)

Backend (Express/Node.js)
├── SocketIOService (WebSocket handlers)
├── ChatService (Business logic)
└── ChatController (REST API)
```

Communication:
- **WebSocket** - Real-time messaging (Socket.IO)
- **REST** - REST API endpoints (future)
- **Storage** - In-memory (MVP), upgrade to DB

## 📚 Documentation

- **DEPLOYMENT_GUIDE.md** - Complete setup guide
- **RoomPageExample.tsx** - Full working example
- **Backend docs** - See parent directory

## 🚀 Next Steps

1. Run deployment script OR copy files manually
2. Install socket.io-client and date-fns
3. Update your room page
4. Start both servers
5. Test at http://localhost:3000

---

**Ready to integrate? Run the deployment script!** 🎉

```bash
python3 deploy.py ~/zoom-clone-frontend
```

Questions? Check DEPLOYMENT_GUIDE.md or the backend documentation!
