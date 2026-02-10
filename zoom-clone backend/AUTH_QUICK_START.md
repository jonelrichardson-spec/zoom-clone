# 🚀 Auth Integration - Quick Reference

**No API keys needed.** Just use your existing authentication!

---

## 1 Minute Setup

### Your Current Code
```typescript
const [userId] = useState(() => `user-${Math.random()...}`);
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
```

### Replace With (NextAuth)
```typescript
import { useSession } from 'next-auth/react';
const { data: session } = useSession();

// Then pass:
userId={session?.user?.id || 'guest'}
userName={session?.user?.name || 'User'}
userAvatar={session?.user?.image || undefined}
```

### Or Supabase
```typescript
import { useUser } from '@supabase/auth-helpers-react';
const { user } = useUser();

userId={user?.id}
userName={user?.user_metadata?.name}
userAvatar={user?.user_metadata?.avatar_url}
```

### Or Firebase
```typescript
import { useAuth } from 'reactfire';
const { user } = useAuth();

userId={user?.uid}
userName={user?.displayName}
userAvatar={user?.photoURL}
```

---

## Room Page Template

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { data: session } = useSession();

  if (!session?.user) return <div>Sign in</div>;

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Your video */}</div>
      <div className="w-80 hidden md:flex border-l border-gray-700">
        <ChatSidebar
          roomId={params.roomId}
          userId={session.user.id || 'guest'}
          userName={session.user.name || 'User'}
          userAvatar={session.user.image || undefined}
        />
      </div>
    </div>
  );
}
```

---

## Changes Needed

| Step | Change |
|------|--------|
| 1 | Add `'use client'` at top of room page |
| 2 | Import auth system (`useSession`, `useUser`, etc.) |
| 3 | Get user data from auth hook |
| 4 | Pass to ChatSidebar instead of random state |
| 5 | Add auth guard (`if (!session?.user) return...`) |

---

## Complete Examples

### NextAuth
```typescript
'use client';
import { useSession } from 'next-auth/react';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { data: session } = useSession();
  if (!session?.user) return null;
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <ChatSidebar roomId={params.roomId} userId={session.user.id} userName={session.user.name} userAvatar={session.user.image} />
    </div>
  );
}
```

### Supabase
```typescript
'use client';
import { useUser } from '@supabase/auth-helpers-react';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <ChatSidebar roomId={params.roomId} userId={user.id} userName={user.user_metadata?.name || user.email} userAvatar={user.user_metadata?.avatar_url} />
    </div>
  );
}
```

### Firebase
```typescript
'use client';
import { useAuth } from 'reactfire';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <ChatSidebar roomId={params.roomId} userId={user.uid} userName={user.displayName} userAvatar={user.photoURL} />
    </div>
  );
}
```

### Custom Hook
```typescript
'use client';
import { useAuth } from '@/hooks/useAuth';
import { ChatSidebar } from '@/app/components/ChatSidebar';

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1">{/* Video */}</div>
      <ChatSidebar roomId={params.roomId} userId={user.id} userName={user.name} userAvatar={user.avatar} />
    </div>
  );
}
```

---

## That's It!

✅ No API keys
✅ No new services
✅ No backend changes
✅ Just use your auth

Chat with real user names now!

---

See `AUTH_INTEGRATION.md` for detailed setup and `ROOM_PAGE_AUTH_INTEGRATION.md` for step-by-step guide.
