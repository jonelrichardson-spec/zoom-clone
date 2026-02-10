# 🔐 Chat Integration with Authentication

Use your existing authentication system with the chat feature. No API keys needed - just pass user data from your auth system.

---

## Setup with NextAuth

If you're using **NextAuth.js**, here's how to integrate:

### 1. Update Room Page

Edit: `app/room/[roomId]/page.tsx`

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { ChatSidebar } from '@/app/components/ChatSidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const roomId = params.roomId;

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Show loading state while session loads
  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Video section */}
      <div className="flex-1">
        {/* Your existing video code here */}
      </div>

      {/* Chat sidebar - uses authenticated user data */}
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
}
```

### 2. How It Works

**Before** (Random users):
```typescript
const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
```

**After** (Real auth users):
```typescript
const userId = session?.user?.id || 'guest';
const userName = session?.user?.name || 'User';
const userAvatar = session?.user?.image || undefined;
```

---

## Setup with Other Auth Systems

### Supabase Auth

```typescript
import { useUser } from '@supabase/auth-helpers-react';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useUser();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <ChatSidebar 
        roomId={params.roomId}
        userId={user.id}
        userName={user.user_metadata?.name || user.email}
        userAvatar={user.user_metadata?.avatar_url}
      />
    </div>
  );
}
```

### Custom Auth Hook

```typescript
import { useAuth } from '@/hooks/useAuth'; // Your custom auth hook

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useAuth();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <ChatSidebar 
        roomId={params.roomId}
        userId={user.id}
        userName={user.username}
        userAvatar={user.profilePicture}
      />
    </div>
  );
}
```

### Firebase Auth

```typescript
import { useAuth } from 'reactfire';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useAuth();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <ChatSidebar 
        roomId={params.roomId}
        userId={user.uid}
        userName={user.displayName || 'User'}
        userAvatar={user.photoURL}
      />
    </div>
  );
}
```

---

## Benefits of Using Real Authentication

✅ **User Identification** - Know who said what in chat
✅ **Persistent Identity** - Same user across sessions
✅ **Security** - Verify users before allowing messages
✅ **Compliance** - Track conversations for audit trails
✅ **Moderation** - Can block/report users by ID
✅ **Message History** - Store messages linked to real users
✅ **Profile Pictures** - Show avatars from auth system
✅ **Personalization** - Customize experience per user

---

## Backend Support

The backend already supports authenticated users. Here's what happens:

### Connection Flow

```
1. Frontend sends user data:
   {
     userId: "user-123",
     userName: "John Doe",
     userAvatar: "https://..."
   }

2. Backend validates and stores:
   socket.userId = "user-123"
   socket.userName = "John Doe"
   socket.userAvatar = "https://..."

3. All messages include user info:
   {
     id: "msg-456",
     userId: "user-123",
     userName: "John Doe",
     userAvatar: "https://...",
     content: "Hello!",
     timestamp: "2024-02-09T..."
   }

4. Other users see authenticated info
```

### Backend Socket Handler

```typescript
// This is already implemented in the backend
socket.on('user_connected', (data) => {
  const { userId, userName, userAvatar } = data;
  
  // Attach to socket for all future events
  socket.userId = userId;
  socket.userName = userName;
  socket.userAvatar = userAvatar;
  
  console.log(`User connected: ${userName} (${userId})`);
  socket.emit('user_connected_ack', { success: true });
});
```

---

## Optional: JWT Token Authentication

For production, add JWT token verification:

### Backend Enhancement

```typescript
// Add to backend middleware
const authenticateSocket = (socket: AuthenticatedSocket, next: any) => {
  const token = socket.handshake.auth.token;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.userId = decoded.userId;
    socket.userName = decoded.userName;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
};

// Use middleware
io.use(authenticateSocket);
```

### Frontend with JWT

```typescript
const token = localStorage.getItem('authToken');

chatSocketService.connect(
  session?.user?.id,
  session?.user?.name,
  session?.user?.image,
  { token } // Pass JWT token
);
```

---

## Migration from Random to Authenticated Users

If you already have chat working with random users:

### Step 1: Update Room Page
Replace random user generation with auth system calls

### Step 2: No Backend Changes Needed!
The backend accepts any user data - it works the same way

### Step 3: Test
- Messages should now show real user names
- User avatars should display from auth system
- Each user gets their real ID

### Step 4: Optional - Add JWT
For extra security, add token verification (see above)

---

## Troubleshooting

### "userAvatar is undefined"
Not all auth systems provide avatars. That's fine:
```typescript
userAvatar={session.user.image || undefined}  // Optional
```

### "Can't access session in layout"
Use client component wrapper:
```typescript
'use client';
import { SessionProvider } from 'next-auth/react';
```

### "User ID is null"
Ensure auth system provides an ID field. If not, use email:
```typescript
userId={session?.user?.email || 'guest'}
```

---

## Summary

✨ **You now have**:
- ✅ Real-time chat with authenticated users
- ✅ User identity in every message
- ✅ Integration with your existing auth system
- ✅ No API keys required
- ✅ Ready for user avatars
- ✅ Foundation for message history per user

Your existing authentication system is perfect for the chat feature. Just pass the user data to the ChatSidebar component!
