# 🎯 Quick Copy Commands

Copy and paste these commands into your terminal to set up everything:

---

## Copy All Files + Install (One Command Block)

```bash
# Create directories
mkdir -p ~/zoom-clone-frontend/app/lib/chat ~/zoom-clone-frontend/app/hooks ~/zoom-clone-frontend/app/components

# Copy the 3 integration files
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_socketService.ts" ~/zoom-clone-frontend/app/lib/chat/socketService.ts && \
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_useChat.ts" ~/zoom-clone-frontend/app/hooks/useChat.ts && \
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_ChatSidebar.tsx" ~/zoom-clone-frontend/app/components/ChatSidebar.tsx && \

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > ~/zoom-clone-frontend/.env.local && \

# Install dependencies
cd ~/zoom-clone-frontend && npm install socket.io-client date-fns && \

# Verify success
echo "✅ All files copied and dependencies installed!" && \
echo "" && \
echo "Next steps:" && \
echo "1. Update app/room/[roomId]/page.tsx with ChatSidebar" && \
echo "2. Terminal 1: cd \"backend\" && npm run dev:watch" && \
echo "3. Terminal 2: cd \"frontend\" && npm run dev" && \
echo "4. Open http://localhost:3000"
```

---

## Step-By-Step (If You Prefer)

### Create Directories
```bash
mkdir -p ~/zoom-clone-frontend/app/lib/chat
mkdir -p ~/zoom-clone-frontend/app/hooks
mkdir -p ~/zoom-clone-frontend/app/components
```

### Copy socketService.ts
```bash
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_socketService.ts" ~/zoom-clone-frontend/app/lib/chat/socketService.ts
```

### Copy useChat.ts
```bash
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_useChat.ts" ~/zoom-clone-frontend/app/hooks/useChat.ts
```

### Copy ChatSidebar.tsx
```bash
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_ChatSidebar.tsx" ~/zoom-clone-frontend/app/components/ChatSidebar.tsx
```

### Create .env.local
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > ~/zoom-clone-frontend/.env.local
```

### Install Dependencies
```bash
cd ~/zoom-clone-frontend
npm install socket.io-client date-fns
```

---

## Verify Files Copied

```bash
ls -la ~/zoom-clone-frontend/app/lib/chat/socketService.ts && \
ls -la ~/zoom-clone-frontend/app/hooks/useChat.ts && \
ls -la ~/zoom-clone-frontend/app/components/ChatSidebar.tsx && \
ls -la ~/zoom-clone-frontend/.env.local
```

---

## Update Room Page

Edit: `~/zoom-clone-frontend/app/room/[roomId]/page.tsx`

**Add import:**
```typescript
import { ChatSidebar } from '@/app/components/ChatSidebar';
```

**Add state:**
```typescript
const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
```

**Update JSX:**
```tsx
return (
  <div className="flex h-screen bg-gray-900">
    <div className="flex-1">{/* Your video */}</div>
    <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
      <ChatSidebar roomId={roomId} userId={userId} userName={userName} />
    </div>
  </div>
);
```

---

## Start Servers

### Terminal 1: Backend
```bash
cd "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend"
npm run dev:watch
```

### Terminal 2: Frontend
```bash
cd ~/zoom-clone-frontend
npm run dev
```

---

## Test

Open: `http://localhost:3000` → Create meeting → See chat on right ✨

---

That's it! 🚀
