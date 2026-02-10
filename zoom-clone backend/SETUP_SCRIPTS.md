# 🚀 Automated Integration Setup

Two automated scripts to copy all chat integration files to your frontend in one command!

## 📋 Quick Start

### **macOS / Linux**
```bash
# Navigate to the backend directory
cd "zoom-clone backend"

# Make script executable (first time only)
chmod +x setup-frontend-integration.sh

# Run the script with frontend path
./setup-frontend-integration.sh /path/to/your/frontend

# Or if your frontend is in the current directory
./setup-frontend-integration.sh
```

### **Windows**
```batch
REM Double-click the batch file or run in command prompt:
setup-frontend-integration.bat

REM Or specify frontend path:
setup-frontend-integration.bat "C:\path\to\your\frontend"
```

---

## 📁 What the Scripts Do

✅ Create necessary directories in your frontend:
- `app/lib/chat/`
- `app/hooks/`
- `app/components/`

✅ Copy 4 integration files:
- `INTEGRATION_socketService.ts` → `app/lib/chat/socketService.ts`
- `INTEGRATION_useChat.ts` → `app/hooks/useChat.ts`
- `INTEGRATION_ChatSidebar.tsx` → `app/components/ChatSidebar.tsx`
- `INTEGRATION_RoomPageExample.tsx` → Root (reference)

✅ Create `.env.local` with backend URL:
- `NEXT_PUBLIC_API_URL=http://localhost:3001`

---

## 🎯 Usage Examples

### Example 1: Frontend in parent directory
```bash
cd "zoom-clone backend"
./setup-frontend-integration.sh ../frontend
```

### Example 2: Frontend in sibling directory
```bash
cd "zoom-clone backend"
./setup-frontend-integration.sh ../../zoom-clone-frontend
```

### Example 3: Using absolute path
```bash
./setup-frontend-integration.sh /Users/yourusername/projects/my-frontend
```

### Example 4: Current directory is frontend
```bash
# From your frontend directory
../zoom-clone\ backend/setup-frontend-integration.sh
```

---

## ✅ Success Criteria

After running the script, you should see:
```
✅ socketService.ts → app/lib/chat/socketService.ts
✅ useChat.ts → app/hooks/useChat.ts
✅ ChatSidebar.tsx → app/components/ChatSidebar.tsx
✅ INTEGRATION_RoomPageExample.tsx → Root folder (reference)
✅ .env.local created with NEXT_PUBLIC_API_URL
```

---

## 🔧 After Running the Script

### Step 1: Install Dependencies
```bash
npm install socket.io-client date-fns
```

### Step 2: Update Your Room Page
Edit `app/room/[roomId]/page.tsx`:

```typescript
// Add import
import { ChatSidebar } from '@/app/components/ChatSidebar';

// Add state
const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);

// Update JSX layout
return (
  <div className="flex h-screen bg-gray-900">
    {/* Video - left side */}
    <div className="flex-1">{/* Your video code */}</div>
    
    {/* Chat - right side */}
    <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
      <ChatSidebar roomId={roomId} userId={userId} userName={userName} />
    </div>
  </div>
);
```

### Step 3: Start Backend & Frontend
```bash
# Terminal 1 - Backend (in backend directory)
npm run dev:watch

# Terminal 2 - Frontend (in frontend directory)
npm run dev
```

### Step 4: Test
- Open http://localhost:3000
- Create a meeting
- Chat sidebar should appear on the right
- Try sending a message!

---

## ❓ Troubleshooting

### Script not found
Make sure you're in the backend directory:
```bash
cd "zoom-clone backend"
ls -la setup-frontend-integration.sh
```

### Permission denied (macOS/Linux)
Make script executable:
```bash
chmod +x setup-frontend-integration.sh
```

### Files not copied
Check the source backend files exist:
```bash
ls -la INTEGRATION_*.ts*
```

### Wrong frontend path
Use absolute paths to be sure:
```bash
./setup-frontend-integration.sh /Users/yourusername/path/to/frontend
```

---

## 📦 Files Copied

All files are copied from this backend directory:

| Source File | Destination | Purpose |
|---|---|---|
| INTEGRATION_socketService.ts | app/lib/chat/socketService.ts | Socket.IO client |
| INTEGRATION_useChat.ts | app/hooks/useChat.ts | React hook |
| INTEGRATION_ChatSidebar.tsx | app/components/ChatSidebar.tsx | UI component |
| INTEGRATION_RoomPageExample.tsx | Root folder | Reference only |

---

## 🔗 Related Files

- **INTEGRATION_SETUP.md** - Detailed step-by-step guide
- **INTEGRATION_COMPLETE.md** - Full feature overview
- **README.md** - Backend API reference
- **START_HERE.md** - Complete overview

---

## ✨ What You Get After Integration

✅ Real-time chat messaging
✅ Typing indicators
✅ Emoji reactions
✅ User presence
✅ Message history (session)
✅ Dark theme UI
✅ Responsive design
✅ Error handling
✅ Connection monitoring

---

## 📞 Need Help?

1. Check **INTEGRATION_SETUP.md** troubleshooting section
2. Review **INTEGRATION_RoomPageExample.tsx** for full example
3. Check browser console (F12) for errors
4. Verify backend is running: `curl http://localhost:3001/api/chat/health`

---

**Ready? Run the script and start integrating!** 🚀
