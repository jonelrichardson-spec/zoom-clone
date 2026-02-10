# Frontend Integration Setup - Step by Step

**Complete checklist for adding chat to your Next.js Zoom Clone frontend.**

---

## ✅ Quick Summary

You have 4 integration files that need to be copied to your frontend:

| File | Location | Purpose |
|------|----------|---------|
| `INTEGRATION_socketService.ts` | `app/lib/chat/socketService.ts` | Socket.IO client & communication |
| `INTEGRATION_useChat.ts` | `app/hooks/useChat.ts` | React hook for chat state |
| `INTEGRATION_ChatSidebar.tsx` | `app/components/ChatSidebar.tsx` | Chat UI component |
| `INTEGRATION_RoomPageExample.tsx` | Reference | How to add chat to room page |

---

## Prerequisites

✅ Backend running on `http://localhost:3001`
✅ Frontend running on `http://localhost:3000`
✅ Next.js 16+ installed
✅ Node.js 18+

---

## Installation Steps

### 1. Install Dependencies

In your **frontend** folder:

```bash
npm install socket.io-client date-fns
```

### 2. Create Directory Structure

```bash
mkdir -p app/lib/chat
mkdir -p app/hooks
mkdir -p app/components
```

### 3. Copy Integration Files

**From backend directory**, copy these files to your frontend:

```bash
# Copy Socket Service
cp INTEGRATION_socketService.ts ../frontend/app/lib/chat/socketService.ts

# Copy Chat Hook
cp INTEGRATION_useChat.ts ../frontend/app/hooks/useChat.ts

# Copy Chat Component
cp INTEGRATION_ChatSidebar.tsx ../frontend/app/components/ChatSidebar.tsx
```

### 4. Configure Environment

Create `.env.local` in your frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 5. Update Room Page

In `app/room/[roomId]/page.tsx`, add the chat imports and component:

**At the top, add:**
```typescript
import { ChatSidebar } from '@/app/components/ChatSidebar';
import { useSession } from 'next-auth/react'; // or your auth system
```

**In your JSX return, change layout to horizontal split:**

Before (only video):
```tsx
return (
  <div>
    {/* Video component here */}
  </div>
);
```

After (video + chat sidebar with authentication):
```tsx
'use client';

const { data: session } = useSession();

if (!session?.user) {
  return <div>Please sign in</div>;
}

return (
  <div className="flex h-screen bg-gray-900">
    {/* Video component - left side */}
    <div className="flex-1">
      {/* Your existing video code */}
    </div>

    {/* Chat sidebar - right side */}
    <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
      <ChatSidebar 
        roomId={roomId} 
        userId={session.user.id || 'guest'}
        userName={session.user.name || 'User'}
        userAvatar={session.user.image || undefined}
      />
    </div>
  </div>
);
```

**Why use real authentication?**
- ✅ Know who sent each message
- ✅ Persistent user identity
- ✅ Show user avatars from profile
- ✅ Ready for message history per user
- ✅ Foundation for user blocking/reporting
- ✅ Better for compliance and auditing

See **AUTH_INTEGRATION.md** for detailed examples with different auth systems (NextAuth, Supabase, Firebase, etc.)

---

## Testing

### Start Backend

```bash
cd zoom-clone\ backend
npm run dev:watch
# Should see: 🚀 Chat Server Running on port 3001
```

### Start Frontend

```bash
cd zoom-clone  # or wherever your Next.js app is
npm run dev
# Should see: ▲ Next.js running at http://localhost:3000
```

### Test the Integration

1. Open `http://localhost:3000` in browser
2. Create a meeting (you'll get a room ID)
3. You should see **Chat** panel on the right side
4. Check browser console - should show "✅ Chat service connected"
5. Try sending a message

### Multi-User Testing

1. Open first tab: `http://localhost:3000`
2. Create meeting → get room link
3. Open second tab with room link
4. Send message in first tab → should appear in second tab in real-time ✨

---

## File Details

### socketService.ts
- **What it does**: Manages Socket.IO WebSocket connection
- **Key methods**: 
  - `connect()` - Initialize connection
  - `joinRoom()` - Join a chat room
  - `sendMessage()` - Send chat message
  - `startTyping()` - Broadcast typing indicator
  - `addReaction()` - Add emoji reaction

### useChat.ts
- **What it does**: React hook wrapping socketService
- **Returns**: 
  - `messages` - Array of chat messages
  - `sendMessage()` - Function to send message
  - `typingUsers` - Who's currently typing
  - `isConnected` - Connection status
  - `addReaction()` - Add emoji reaction

### ChatSidebar.tsx
- **What it does**: Complete chat UI component
- **Features**:
  - Message display with user avatars
  - Emoji reactions picker
  - Typing indicators
  - Auto-scroll to latest message
  - Dark theme (matches video interface)

---

## Customization

### Change Colors

Edit `ChatSidebar.tsx` CSS classes:

```tsx
// Current dark theme
className="bg-gray-900"     // Change to bg-blue-900, bg-slate-900, etc.
className="text-white"      // Change to text-gray-100, etc.
```

### Change Emoji Reactions

In `ChatSidebar.tsx`, find `EMOJI_REACTIONS`:

```typescript
const EMOJI_REACTIONS = ['👍', '❤️', '😂', '🔥', '👀', '🎉', '😍', '🤔'];
// Add/remove emojis as needed
```

### Change Chat Sidebar Width

In room page:
```tsx
<div className="w-80">  {/* Change 80 to 96 for wider, 64 for narrower */}
```

### Change User Name

In room page state:
```typescript
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
// Can generate from auth system instead
```

---

## Troubleshooting

### "Cannot find module 'socket.io-client'"

**Solution**: Install dependencies
```bash
npm install socket.io-client date-fns
```

### "Connection refused / Cannot reach localhost:3001"

**Solutions**:
1. Verify backend is running: `npm run dev:watch`
2. Check `.env.local` has correct URL
3. Check no firewall blocking port 3001
4. Try in different browser

### Chat sidebar not appearing

**Solutions**:
1. Verify component imported correctly at top of page
2. Check file paths match your structure
3. Verify `'use client'` directive at top of ChatSidebar.tsx
4. Check browser console for errors

### Messages not sending

**Solutions**:
1. Open DevTools → Console for errors
2. Check Network → WS tab for WebSocket connection
3. Verify backend logs show incoming events
4. Make sure you're in a room (should see "✅ Connected" status)

### Styling looks wrong

**Solutions**:
1. Verify Tailwind CSS is installed: `npm install -D tailwindcss`
2. Check `tailwind.config.ts` includes `app/**/*.{js,ts,jsx,tsx}`
3. Clear build cache: `npm run build && npm run dev`

---

## What's Next?

### Authentication
Connect your user auth system:
```typescript
// Instead of random user ID:
const userId = useSession()?.user?.id;
const userName = useSession()?.user?.name;
```

### Database
Store chat history in backend database:
- Add MongoDB/PostgreSQL to backend
- Update ChatService to use database instead of in-memory

### File Sharing
Add ability to share files in chat:
- Upload UI button
- File type detection
- Download links in messages

### Notifications
Show browser notifications for new messages:
```typescript
// In useChat hook
new Notification(`New message from ${message.userName}`, {
  body: message.content
});
```

### Message Search
Let users search old messages:
- Add search UI to sidebar header
- Backend query to find messages by content/user

---

## Project Structure Reference

After setup, your frontend should look like:

```
zoom-clone/
├── app/
│   ├── page.tsx                    # Home page
│   ├── room/
│   │   └── [roomId]/
│   │       └── page.tsx            # VIDEO CALL PAGE (modify this)
│   ├── layout.tsx
│   ├── globals.css
│   ├── lib/
│   │   └── chat/
│   │       └── socketService.ts    # ✨ NEW
│   ├── hooks/
│   │   └── useChat.ts              # ✨ NEW
│   └── components/
│       └── ChatSidebar.tsx         # ✨ NEW
├── .env.local                      # ✨ NEW
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Backend Reference

For debugging, here's what the backend provides:

### REST API Endpoints

```
POST   /api/chat/health               # Health check
POST   /api/chat/rooms                # Create room
GET    /api/chat/rooms/:roomId        # Get room info
GET    /api/chat/messages/:roomId     # Get message history
GET    /api/chat/typing/:roomId       # Get who's typing
```

### WebSocket Events (Sent by Frontend)

```
user_connected                        # Auth/identify user
join_room                            # Enter chat room
leave_room                           # Exit room
new_message                          # Send message
user_typing                          # Broadcast typing
user_stopped_typing                  # Stop typing broadcast
message_reaction                     # Add emoji reaction
message_edited                       # Edit message
message_deleted                      # Delete message
```

### WebSocket Events (Received by Frontend)

```
user_connected_ack                   # Server acknowledged
room_joined                          # Successfully joined
new_message                          # New message to display
user_typing                          # Someone is typing
user_stopped_typing                  # Someone stopped typing
message_reaction                     # Reaction added
message_edited                       # Message was edited
message_deleted                      # Message was deleted
error                               # Server error
```

---

## Support

Having issues?

1. **Check logs**:
   - Backend: Look for errors in terminal running `npm run dev:watch`
   - Frontend: Check browser DevTools Console (F12)

2. **Verify connectivity**:
   - Backend status: `curl http://localhost:3001/api/chat/health`
   - Should return: `{"success":true,"message":"Chat Server Running"}`

3. **Network inspection**:
   - Open DevTools → Network tab
   - Look for WebSocket connection labeled "socket.io"
   - Should show "ws://" protocol

4. **Ask for help**:
   - Check QUICKSTART.md in backend folder
   - Review integration examples in INTEGRATION files
   - Check README.md for API details

---

## Summary

✨ **You now have**:
- ✅ Real-time chat alongside video calls
- ✅ Typing indicators  
- ✅ Emoji reactions
- ✅ Dark theme UI
- ✅ P2P video + Server-based chat architecture

🎉 **Chat is now integrated!**
