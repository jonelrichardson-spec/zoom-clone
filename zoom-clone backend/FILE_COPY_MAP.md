# 📁 File Copy Map

Visual guide showing exactly where each file goes.

---

## Files to Copy

### File 1: socketService.ts
```
FROM:
/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/
  └─ INTEGRATION_socketService.ts

TO:
~/zoom-clone-frontend/
  └─ app/
      └─ lib/
          └─ chat/
              └─ socketService.ts  ← RENAME (remove INTEGRATION_)

COMMAND:
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_socketService.ts" ~/zoom-clone-frontend/app/lib/chat/socketService.ts
```

---

### File 2: useChat.ts
```
FROM:
/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/
  └─ INTEGRATION_useChat.ts

TO:
~/zoom-clone-frontend/
  └─ app/
      └─ hooks/
          └─ useChat.ts  ← RENAME (remove INTEGRATION_)

COMMAND:
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_useChat.ts" ~/zoom-clone-frontend/app/hooks/useChat.ts
```

---

### File 3: ChatSidebar.tsx
```
FROM:
/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/
  └─ INTEGRATION_ChatSidebar.tsx

TO:
~/zoom-clone-frontend/
  └─ app/
      └─ components/
          └─ ChatSidebar.tsx  ← RENAME (remove INTEGRATION_)

COMMAND:
cp "/Users/garygonzalez/zoom-clone/zoom-clone/zoom-clone backend/INTEGRATION_ChatSidebar.tsx" ~/zoom-clone-frontend/app/components/ChatSidebar.tsx
```

---

## File 4: .env.local (NEW FILE)
```
LOCATION:
~/zoom-clone-frontend/
  └─ .env.local  ← CREATE NEW

CONTENT:
NEXT_PUBLIC_API_URL=http://localhost:3001

COMMAND:
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > ~/zoom-clone-frontend/.env.local
```

---

## Complete Frontend Structure After Copy

```
zoom-clone-frontend/
├── .env.local                          ← NEW FILE (Environment config)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── app/
│   ├── layout.tsx                      (existing)
│   ├── page.tsx                        (existing)
│   ├── globals.css                     (existing)
│   ├── room/
│   │   └── [roomId]/
│   │       └── page.tsx                (MODIFY - add ChatSidebar)
│   ├── lib/
│   │   └── chat/
│   │       └── socketService.ts        ← NEW FILE (copy from backend)
│   ├── hooks/
│   │   └── useChat.ts                  ← NEW FILE (copy from backend)
│   └── components/
│       ├── ChatSidebar.tsx             ← NEW FILE (copy from backend)
│       └── ... (existing components)
└── ... (other files)
```

---

## Copy Verification

After copying, verify files exist:

```bash
# Check socketService.ts
ls -la ~/zoom-clone-frontend/app/lib/chat/socketService.ts
# Should show file size ~9KB

# Check useChat.ts
ls -la ~/zoom-clone-frontend/app/hooks/useChat.ts
# Should show file size ~5KB

# Check ChatSidebar.tsx
ls -la ~/zoom-clone-frontend/app/components/ChatSidebar.tsx
# Should show file size ~11KB

# Check .env.local
ls -la ~/zoom-clone-frontend/.env.local
# Should show file
```

---

## Summary

**3 Files to Copy** (from backend INTEGRATION_*.ts files)
**1 File to Create** (.env.local with API URL)
**1 File to Modify** (app/room/[roomId]/page.tsx - add ChatSidebar)

All commands provided above! 🚀
