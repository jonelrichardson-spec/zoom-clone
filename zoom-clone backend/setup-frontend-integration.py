#!/usr/bin/env python3
"""
Zoom Clone - Frontend Integration Setup (Python)
Automatically copies chat integration files to your Next.js frontend
"""

import os
import sys
import shutil
from pathlib import Path
from datetime import datetime

# Color codes
GREEN = '\033[92m'
BLUE = '\033[94m'
RED = '\033[91m'
YELLOW = '\033[93m'
NC = '\033[0m'

def print_header():
    print(f"\n{BLUE}{'='*60}{NC}")
    print(f"{BLUE}  Zoom Clone - Frontend Chat Integration Setup{NC}")
    print(f"{BLUE}{'='*60}{NC}\n")

def print_success(msg):
    print(f"{GREEN}✅ {msg}{NC}")

def print_error(msg):
    print(f"{RED}❌ {msg}{NC}")

def print_warning(msg):
    print(f"{YELLOW}⚠️  {msg}{NC}")

def print_info(msg):
    print(f"{BLUE}ℹ️  {msg}{NC}")

def copy_file(src, dst):
    """Copy file and return success status"""
    try:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        return True
    except Exception as e:
        print_error(f"Failed to copy {src}: {e}")
        return False

def main():
    print_header()
    
    # Get backend directory (script location)
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Get frontend directory from argument or use default
    if len(sys.argv) > 1:
        frontend_dir = sys.argv[1]
    else:
        # Try common locations
        home = os.path.expanduser("~")
        potential_paths = [
            f"{home}/zoom-clone-frontend",
            f"{home}/projects/zoom-clone-frontend",
            "/Users/garygonzalez/zoom-clone-frontend",
            "../frontend",
        ]
        
        frontend_dir = None
        for path in potential_paths:
            if os.path.exists(path) and os.path.isdir(path):
                frontend_dir = path
                break
        
        if not frontend_dir:
            print_error("Frontend directory not found")
            print(f"\nUsage: {sys.argv[0]} /path/to/frontend")
            print("\nOr set frontend path in one of these locations:")
            for p in potential_paths:
                print(f"  • {p}")
            sys.exit(1)
    
    frontend_dir = os.path.abspath(frontend_dir)
    
    # Check backend files exist
    backend_files = [
        'INTEGRATION_socketService.ts',
        'INTEGRATION_useChat.ts',
        'INTEGRATION_ChatSidebar.tsx',
        'INTEGRATION_RoomPageExample.tsx'
    ]
    
    for file in backend_files:
        if not os.path.exists(os.path.join(backend_dir, file)):
            print_error(f"Cannot find {file} in {backend_dir}")
            sys.exit(1)
    
    print(f"{YELLOW}📁 Source (Backend): {backend_dir}{NC}")
    print(f"{YELLOW}📁 Target (Frontend): {frontend_dir}{NC}\n")
    
    # Create directories
    print(f"{BLUE}📂 Creating directory structure...{NC}")
    dirs_to_create = [
        'app/lib/chat',
        'app/hooks',
        'app/components'
    ]
    
    for dir_path in dirs_to_create:
        full_path = os.path.join(frontend_dir, dir_path)
        os.makedirs(full_path, exist_ok=True)
    
    print_success("Directories created\n")
    
    # Copy files
    print(f"{BLUE}📋 Copying integration files...{NC}")
    
    files_to_copy = [
        ('INTEGRATION_socketService.ts', 'app/lib/chat/socketService.ts'),
        ('INTEGRATION_useChat.ts', 'app/hooks/useChat.ts'),
        ('INTEGRATION_ChatSidebar.tsx', 'app/components/ChatSidebar.tsx'),
        ('INTEGRATION_RoomPageExample.tsx', 'INTEGRATION_RoomPageExample.tsx'),
    ]
    
    all_copied = True
    for src_name, dst_rel in files_to_copy:
        src = os.path.join(backend_dir, src_name)
        dst = os.path.join(frontend_dir, dst_rel)
        
        if copy_file(src, dst):
            print_success(f"{src_name} → {dst_rel}")
        else:
            all_copied = False
    
    if not all_copied:
        sys.exit(1)
    
    print()
    
    # Create .env.local
    print(f"{BLUE}⚙️  Configuring environment...{NC}")
    env_path = os.path.join(frontend_dir, '.env.local')
    
    if os.path.exists(env_path):
        print_warning(".env.local already exists (not overwritten)")
    else:
        try:
            with open(env_path, 'w') as f:
                f.write("NEXT_PUBLIC_API_URL=http://localhost:3001\n")
            print_success(".env.local created with NEXT_PUBLIC_API_URL")
        except Exception as e:
            print_error(f"Failed to create .env.local: {e}")
            sys.exit(1)
    
    print()
    
    # Success message
    print(f"{BLUE}{'='*60}{NC}")
    print(f"{GREEN}✅ Integration files merged successfully!{NC}")
    print(f"{BLUE}{'='*60}{NC}\n")
    
    # Next steps
    print(f"{BLUE}📋 Next Steps:{NC}\n")
    
    print("1️⃣  Install dependencies:")
    print(f"   {YELLOW}npm install socket.io-client date-fns{NC}\n")
    
    print("2️⃣  Update your room page (app/room/[roomId]/page.tsx):")
    print(f"   {YELLOW}import {{ ChatSidebar }} from '@/app/components/ChatSidebar';{NC}\n")
    
    print("3️⃣  Add user state in your component:")
    print(f"   {YELLOW}const [userId] = useState(() => `user-${{Math.random().toString(36).substr(2, 9)}}`);\n   const [userName] = useState(() => `User ${{Math.floor(Math.random() * 1000)}}`);\n{NC}")
    
    print("4️⃣  Add ChatSidebar to your JSX:")
    print(f"   {YELLOW}<ChatSidebar roomId={{roomId}} userId={{userId}} userName={{userName}} />{NC}\n")
    
    print("5️⃣  Start the backend (in another terminal):")
    print(f"   {YELLOW}npm run dev:watch{NC}\n")
    
    print("6️⃣  Start the frontend:")
    print(f"   {YELLOW}npm run dev{NC}\n")
    
    print("7️⃣  Test:")
    print(f"   {YELLOW}Open http://localhost:3000 and create a meeting{NC}\n")
    
    print(f"{BLUE}📚 Reference Files:{NC}")
    print("   • INTEGRATION_RoomPageExample.tsx - Full room page example")
    print("   • ../INTEGRATION_SETUP.md - Setup guide")
    print("   • ../README.md - API reference\n")
    
    print(f"{GREEN}🎉 Ready to integrate chat into your video call!{NC}\n")

if __name__ == '__main__':
    main()
