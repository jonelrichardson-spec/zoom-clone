#!/usr/bin/env python3
"""
Frontend Integration Deployment Script
Automatically copies all integration files to your Next.js frontend
"""

import os
import shutil
import sys
from pathlib import Path

def print_header(text):
    print(f"\n{'='*60}")
    print(f"  {text}")
    print(f"{'='*60}\n")

def print_success(text):
    print(f"✅ {text}")

def print_error(text):
    print(f"❌ {text}")

def print_info(text):
    print(f"ℹ️  {text}")

def deploy_integration(frontend_path):
    """Deploy integration files to frontend"""
    
    print_header("Frontend Integration Deployment")
    
    # Validate frontend path
    frontend_path = Path(frontend_path).expanduser()
    
    if not frontend_path.exists():
        print_error(f"Frontend directory not found: {frontend_path}")
        return False
    
    print_info(f"Target frontend: {frontend_path}")
    
    # Define source and destination
    backend_path = Path(__file__).parent
    files_to_copy = {
        'socketService.ts': 'app/lib/chat/socketService.ts',
        'useChat.ts': 'app/hooks/useChat.ts',
        'ChatSidebar.tsx': 'app/components/ChatSidebar.tsx',
    }
    
    try:
        # Create directories
        print("\n📁 Creating directories...")
        for dest_file in files_to_copy.values():
            dest_dir = frontend_path / dest_file.rsplit('/', 1)[0]
            dest_dir.mkdir(parents=True, exist_ok=True)
            print_success(f"Created: {dest_dir}")
        
        # Copy files
        print("\n📋 Copying integration files...")
        for src_file, dest_file in files_to_copy.items():
            src = backend_path / src_file
            dest = frontend_path / dest_file
            
            if not src.exists():
                print_error(f"Source file not found: {src}")
                return False
            
            shutil.copy2(src, dest)
            print_success(f"Copied: {src_file} → {dest_file}")
        
        # Create .env.local
        print("\n⚙️  Creating environment file...")
        env_file = frontend_path / '.env.local'
        env_content = "NEXT_PUBLIC_API_URL=http://localhost:3001\n"
        
        if env_file.exists():
            print_info(f".env.local already exists (not overwriting)")
        else:
            with open(env_file, 'w') as f:
                f.write(env_content)
            print_success("Created: .env.local")
        
        # Create installation guide
        print("\n📖 Creating quick-start guide...")
        guide_file = frontend_path / 'CHAT_INTEGRATION_QUICK_START.md'
        guide_content = """# Chat Integration Quick Start

## ✅ Files Installed
- ✅ socketService.ts (app/lib/chat/)
- ✅ useChat.ts (app/hooks/)
- ✅ ChatSidebar.tsx (app/components/)
- ✅ .env.local (root)

## 📦 Install Dependencies
```bash
npm install socket.io-client date-fns
```

## 🎨 Update Your Room Page
Edit `app/room/[roomId]/page.tsx`:

1. Add import at top:
```typescript
import { ChatSidebar } from '@/app/components/ChatSidebar';
```

2. Add state for user:
```typescript
const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
```

3. Update JSX to include ChatSidebar:
```tsx
<div className="flex h-screen">
  <div className="flex-1">{/* Your video here */}</div>
  <div className="w-80 hidden md:flex">
    <ChatSidebar roomId={roomId} userId={userId} userName={userName} />
  </div>
</div>
```

## 🚀 Start Servers
```bash
# Terminal 1: Backend
cd ../backend
npm run dev:watch

# Terminal 2: Frontend
npm run dev
```

## ✨ Test It
1. Open http://localhost:3000
2. Create meeting
3. Chat sidebar appears on right! 🎉
4. Send messages in real-time

## 📚 Full Setup Guide
See: `../backend/INTEGRATION_DEPLOY/DEPLOYMENT_GUIDE.md`
"""
        with open(guide_file, 'w') as f:
            f.write(guide_content)
        print_success("Created: CHAT_INTEGRATION_QUICK_START.md")
        
        print_header("✨ Integration Complete!")
        print(f"""
Your frontend is now ready for chat! 🎉

📁 Files installed:
   • app/lib/chat/socketService.ts
   • app/hooks/useChat.ts
   • app/components/ChatSidebar.tsx
   • .env.local

📦 Next steps:
   1. Run: npm install socket.io-client date-fns
   2. Update app/room/[roomId]/page.tsx with ChatSidebar
   3. Start backend: npm run dev:watch
   4. Start frontend: npm run dev

✅ Then test at http://localhost:3000

See CHAT_INTEGRATION_QUICK_START.md for details!
        """)
        return True
        
    except Exception as e:
        print_error(f"Deployment failed: {e}")
        return False

def main():
    if len(sys.argv) < 2:
        print("""
Usage: python3 deploy.py <frontend-path>

Example:
  python3 deploy.py ~/zoom-clone-frontend
  python3 deploy.py /Users/username/projects/next-app
        """)
        sys.exit(1)
    
    frontend_path = sys.argv[1]
    success = deploy_integration(frontend_path)
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
