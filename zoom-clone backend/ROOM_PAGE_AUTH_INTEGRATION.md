# 🔐 Update Room Page with Chat & Authentication

**File:** `app/room/[roomId]/page.tsx`

Use your existing authentication system to identify users in chat. No random usernames!

---

## Complete Example: NextAuth Integration

```typescript
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const roomId = params.roomId;

  // Handle loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading chat...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session?.user) {
    React.useEffect(() => {
      router.push('/login');
    }, []);
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* VIDEO CALL SECTION - Left Side */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Your PeerJS video component here */}
        <div className="text-white">
          <h1 className="text-2xl font-bold mb-4">Video Room: {roomId}</h1>
          
          {/* Show current user */}
          <p className="text-gray-300">
            Logged in as: <span className="text-green-400">{session.user.name}</span>
          </p>
          
          {/* Your video component/video stream goes here */}
        </div>
      </div>

      {/* CHAT SECTION - Right Side */}
      <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
        <ChatSidebar
          roomId={roomId}
          userId={session.user.id || 'guest'}
          userName={session.user.name || 'Anonymous User'}
          userAvatar={session.user.image || undefined}
        />
      </div>
    </div>
  );
}
```

---

## Step-by-Step Modifications

### Change 1: Add Imports

```typescript
// Add these imports
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChatSidebar } from '@/app/components/ChatSidebar';
```

### Change 2: Add 'use client' Directive

Add this at the very top of the file (before imports):

```typescript
'use client';
```

### Change 3: Get Auth Session

Inside your component function:

```typescript
const { data: session, status } = useSession();
const router = useRouter();
```

### Change 4: Add Auth Check

Add this protection before your return statement:

```typescript
if (status === 'loading') {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-white">Loading...</div>
    </div>
  );
}

if (!session?.user) {
  React.useEffect(() => {
    router.push('/login');
  }, []);
  return null;
}
```

### Change 5: Update Return JSX

Replace your current return with split layout:

```typescript
return (
  <div className="flex h-screen bg-gray-900">
    {/* LEFT: Your video component */}
    <div className="flex-1">
      {/* Keep your existing video code here */}
    </div>

    {/* RIGHT: Chat sidebar */}
    <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
      <ChatSidebar
        roomId={params.roomId}
        userId={session.user.id || 'guest'}
        userName={session.user.name || 'User'}
        userAvatar={session.user.image || undefined}
      />
    </div>
  </div>
);
```

---

## Examples with Other Auth Systems

### Supabase Auth

```typescript
'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useUser();

  if (!user) {
    return <div className="text-white">Please sign in</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
        <ChatSidebar
          roomId={params.roomId}
          userId={user.id}
          userName={user.user_metadata?.name || user.email}
          userAvatar={user.user_metadata?.avatar_url}
        />
      </div>
    </div>
  );
}
```

### Firebase Auth

```typescript
'use client';

import { useAuth } from 'reactfire';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-white">Please sign in</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
        <ChatSidebar
          roomId={params.roomId}
          userId={user.uid}
          userName={user.displayName || 'User'}
          userAvatar={user.photoURL}
        />
      </div>
    </div>
  );
}
```

### Custom Auth Hook

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (!user) return <div className="text-white">Please sign in</div>;

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <div className="w-80 bg-gray-900 border-l border-gray-700 hidden md:flex flex-col">
        <ChatSidebar
          roomId={params.roomId}
          userId={user.id}
          userName={user.username}
          userAvatar={user.avatarUrl}
        />
      </div>
    </div>
  );
}
```

---

## What Each Prop Does

| Prop | Required | Source | Example |
|------|----------|--------|---------|
| `roomId` | ✅ Yes | URL params | `params.roomId` |
| `userId` | ✅ Yes | Auth system | `session?.user?.id` |
| `userName` | ✅ Yes | Auth system | `session?.user?.name` |
| `userAvatar` | ❌ Optional | Auth system | `session?.user?.image` |

---

## Optional Customizations

### Hide Chat on Mobile

Current: Chat hidden on mobile (`hidden md:flex`)

```typescript
// To show chat on all devices, change:
<div className="hidden md:flex flex-col">

// To:
<div className="flex flex-col">
```

### Make Chat Modal on Mobile

```typescript
import { useState } from 'react';

const [chatOpen, setChatOpen] = useState(false);

return (
  <div className="flex h-screen bg-gray-900">
    <div className="flex-1">{/* Video */}</div>
    
    {/* Mobile button */}
    <button 
      onClick={() => setChatOpen(true)}
      className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded"
    >
      💬 Chat ({unreadCount})
    </button>
    
    {/* Desktop sidebar */}
    <div className="hidden md:flex w-80 border-l border-gray-700">
      <ChatSidebar {...props} />
    </div>
  </div>
);
```

---

## Verification Checklist

After making changes:

- [ ] File has `'use client'` at top
- [ ] File imports `ChatSidebar` component
- [ ] Auth system is imported (NextAuth/Supabase/Firebase/Custom)
- [ ] Auth check redirects to login if no user
- [ ] Chat sidebar receives `userId`, `userName` from auth
- [ ] `roomId` comes from URL params
- [ ] `userAvatar` is optional
- [ ] Layout is flex row with video left, chat right
- [ ] No TypeScript errors in IDE

---

## Benefits

✅ **Real user identification** - Users show real names, not "User 123"
✅ **Persistent identity** - Same user across sessions
✅ **Profile pictures** - Avatars from auth system
✅ **Security** - Only authenticated users can chat
✅ **Audit trail** - Know who sent each message
✅ **Ready for history** - Can store and retrieve messages per user
✅ **Moderation** - Can block/report users by ID

---

## See Also

- `AUTH_INTEGRATION.md` - Complete guide for all auth systems
- `INTEGRATION_SETUP.md` - Full integration setup
- `QUICK_COPY_COMMANDS.md` - Quick copy commands
