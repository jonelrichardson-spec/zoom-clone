# 🚀 Frontend Integration Deployment Package

All 4 frontend integration files are ready in this `INTEGRATION_DEPLOY` folder!

## 📋 Quick Setup (5 minutes)

### Step 1: Copy Files to Frontend

Copy these 4 files from `INTEGRATION_DEPLOY/` to your frontend:

```
INTEGRATION_DEPLOY/
├── socketService.ts      → frontend/app/lib/chat/socketService.ts
├── useChat.ts            → frontend/app/hooks/useChat.ts
├── ChatSidebar.tsx       → frontend/app/components/ChatSidebar.tsx
└── RoomPageExample.tsx   → Reference: how to integrate into your room page
```

**Quick Commands:**
```bash
# From backend directory
mkdir -p ../frontend/app/lib/chat ../frontend/app/hooks ../frontend/app/components

# Copy files
cp INTEGRATION_DEPLOY/socketService.ts ../frontend/app/lib/chat/
cp INTEGRATION_DEPLOY/useChat.ts ../frontend/app/hooks/
cp INTEGRATION_DEPLOY/ChatSidebar.tsx ../frontend/app/components/
```

### Step 2: Create Environment File

In your frontend root, create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Step 3: Install Dependencies

```bash
cd your-frontend-directory
npm install socket.io-client date-fns
```

### Step 4: Update Your Room Page

Edit `app/room/[roomId]/page.tsx`:

**Add at top:**
```typescript
import { ChatSidebar } from '@/app/components/ChatSidebar';
```

**Add state:**
```typescript
const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
```

**Update JSX to split-screen layout:**
```tsx
return (
  <div className="flex h-screen bg-gray-900">
    {/* Video left side */}
    <div className="flex-1">
      {/* Your existing video code */}
    </div>

    {/* Chat right side */}
    <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
      <ChatSidebar 
        roomId={roomId} 
        userId={userId} 
        userName={userName} 
      />
    </div>
  </div>
);
```

See `RoomPageExample.tsx` for complete working example!

### Step 5: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd zoom-clone\ backend
npm run dev:watch
# Should show: 🚀 Chat Server Running on port 3001
```

**Terminal 2 - Frontend:**
```bash
cd your-frontend-directory
npm run dev
# Should show: ▲ Next.js running at http://localhost:3000
```

### Step 6: Test

1. Open `http://localhost:3000`
2. Create a meeting → get room ID
3. Chat sidebar appears on right ✨
4. Send messages → real-time updates
5. See typing indicators
6. Add emoji reactions

---

## 📁 File Details

### socketService.ts
**What:** Socket.IO client wrapper for WebSocket communication
**Size:** ~307 lines
**Key Methods:**
- `connect()` - Initialize Socket.IO connection
- `joinRoom(roomId)` - Join a chat room
- `sendMessage(content)` - Send message
- `startTyping() / stopTyping()` - Typing indicators
- `addReaction(messageId, emoji)` - Emoji reactions

### useChat.ts
**What:** React hook for chat state management
**Size:** ~175 lines
**Returns:**
```typescript
{
  messages: ChatMessage[],
  sendMessage: (content: string) => void,
  typingUsers: TypingUser[],
  isConnected: boolean,
  error: string | null,
  addReaction: (messageId, emoji) => void,
  // ... more
}
```

### ChatSidebar.tsx
**What:** Complete chat UI component
**Size:** ~360 lines
**Features:**
- Real-time message display
- User avatars with initials
- Emoji reaction picker
- Typing indicators
- Dark theme (Tailwind)
- Auto-scroll to latest
- Edit mode (ready for implementation)
- Timestamps (HH:mm format)

### RoomPageExample.tsx
**What:** Complete room page integration example
**Size:** ~275 lines
**Shows:**
- How to add ChatSidebar to video call
- Split-screen layout (video left, chat right)
- Full working example with video + chat
- State management for both features
- Media controls (mute, camera toggle)

---

## 🔧 Customization

### Change Chat Sidebar Width
In your room page:
```tsx
<div className="w-80">  {/* Change 80 to 96, 64, etc */}
```

### Change Emoji Reactions
In `ChatSidebar.tsx`, find `EMOJI_REACTIONS`:
```typescript
const EMOJI_REACTIONS = ['👍', '❤️', '😂', '🔥', '👀', '🎉', '😍', '🤔'];
// Add/remove as needed
```

### Change Theme Colors
In `ChatSidebar.tsx`, update class names:
```typescript
className="bg-gray-900"      // bg-blue-900, bg-slate-900, etc
className="bg-gray-800"      // bg-blue-800, etc
```

### Use Real User Data
Replace random user generation:
```typescript
// Instead of:
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);

// Use your auth system:
const [userName] = useState(() => session?.user?.name || 'Guest');
const [userId] = useState(() => session?.user?.id || 'guest');
```

---

## 🐛 Troubleshooting

### "Cannot find module 'socket.io-client'"
```bash
npm install socket.io-client date-fns
```

### "Connection refused to localhost:3001"
- Verify backend running: `npm run dev:watch`
- Check `.env.local` has correct URL
- Check no firewall blocking port 3001

### Chat sidebar not appearing
- Verify import: `import { ChatSidebar } from '@/app/components/ChatSidebar';`
- Check file paths match your structure
- Check browser console (F12) for errors
- Verify component is in JSX

### Messages not sending
- Open DevTools → Console for errors
- Check Network → WS tab for WebSocket
- Verify backend logs show events
- Check connection status shows "🟢 Connected"

### Styling looks wrong
- Ensure Tailwind CSS installed: `npm install -D tailwindcss`
- Check `tailwind.config.ts` includes `app/**/*.{js,ts,jsx,tsx}`
- Run: `npm run build && npm run dev`

---

## ✨ Features Included

✅ Real-time chat messaging  
✅ Typing indicators (3 second auto-hide)  
✅ Emoji reactions (8 pre-configured)  
✅ User presence & avatars  
✅ Message timestamps  
✅ Dark theme UI  
✅ Responsive design  
✅ Error handling  
✅ Connection status indicator  
✅ Auto-scroll to latest message  
✅ Message editing UI (backend ready)  
✅ P2P video + server-based chat architecture  

---

## 📚 Backend API Reference

### REST Endpoints
```
POST   /api/chat/health              # Health check
POST   /api/chat/rooms               # Create room
GET    /api/chat/rooms/:roomId       # Get room info
GET    /api/chat/messages/:roomId    # Get message history
GET    /api/chat/typing/:roomId      # Get who's typing
```

### WebSocket Events (From Frontend)
```
user_connected          # Auth/identify user
join_room              # Enter chat room
leave_room             # Exit room
new_message            # Send message
user_typing            # Broadcast typing
user_stopped_typing    # Stop typing broadcast
message_reaction       # Add emoji reaction
message_edited         # Edit message
message_deleted        # Delete message
```

### WebSocket Events (To Frontend)
```
user_connected_ack     # Server acknowledged
room_joined            # Successfully joined
new_message            # New message to display
user_typing            # Someone is typing
user_stopped_typing    # Someone stopped typing
message_reaction       # Reaction added
message_edited         # Message was edited
message_deleted        # Message was deleted
error                 # Server error
```

---

## 🎯 Next Steps

1. **Copy the 4 files** to your frontend
2. **Create .env.local** with API URL
3. **Install dependencies** (socket.io-client, date-fns)
4. **Update your room page** (add ChatSidebar component)
5. **Start both servers** (backend on 3001, frontend on 3000)
6. **Test** - open http://localhost:3000

---

## ❓ Need Help?

- Check browser DevTools Console (F12) for JavaScript errors
- Check backend terminal for server errors
- Review `RoomPageExample.tsx` for complete working example
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Verify both servers are running on correct ports

---

**You're all set! 🚀 Integration is just copy-paste away!**

Questions? Check the documentation files in the backend directory.
