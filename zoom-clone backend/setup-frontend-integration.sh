#!/bin/bash

# ============================================================================
# Zoom Clone - Frontend Integration Setup Script
# Automatically copies chat integration files to your Next.js frontend
# ============================================================================

set -e  # Exit on any error

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Zoom Clone - Frontend Chat Integration Setup${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}\n"

# Get script directory (where this script is located)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Define paths
BACKEND_DIR="$SCRIPT_DIR"
FRONTEND_DIR="${1:-.}"  # Use first argument as frontend path, or current directory

# Check if backend files exist
if [ ! -f "$BACKEND_DIR/INTEGRATION_socketService.ts" ]; then
    echo -e "${RED}❌ Error: Cannot find INTEGRATION_socketService.ts in $BACKEND_DIR${NC}"
    echo -e "${YELLOW}Make sure you run this script from the backend directory${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Source (Backend): $BACKEND_DIR${NC}"
echo -e "${YELLOW}📁 Target (Frontend): $FRONTEND_DIR${NC}\n"

# Create directories in frontend
echo -e "${BLUE}📂 Creating directory structure...${NC}"
mkdir -p "$FRONTEND_DIR/app/lib/chat"
mkdir -p "$FRONTEND_DIR/app/hooks"
mkdir -p "$FRONTEND_DIR/app/components"
echo -e "${GREEN}✅ Directories created${NC}\n"

# Copy files
echo -e "${BLUE}📋 Copying integration files...${NC}"

# Copy socketService
if cp "$BACKEND_DIR/INTEGRATION_socketService.ts" "$FRONTEND_DIR/app/lib/chat/socketService.ts"; then
    echo -e "${GREEN}✅ socketService.ts${NC} → app/lib/chat/socketService.ts"
else
    echo -e "${RED}❌ Failed to copy socketService.ts${NC}"
    exit 1
fi

# Copy useChat hook
if cp "$BACKEND_DIR/INTEGRATION_useChat.ts" "$FRONTEND_DIR/app/hooks/useChat.ts"; then
    echo -e "${GREEN}✅ useChat.ts${NC} → app/hooks/useChat.ts"
else
    echo -e "${RED}❌ Failed to copy useChat.ts${NC}"
    exit 1
fi

# Copy ChatSidebar component
if cp "$BACKEND_DIR/INTEGRATION_ChatSidebar.tsx" "$FRONTEND_DIR/app/components/ChatSidebar.tsx"; then
    echo -e "${GREEN}✅ ChatSidebar.tsx${NC} → app/components/ChatSidebar.tsx"
else
    echo -e "${RED}❌ Failed to copy ChatSidebar.tsx${NC}"
    exit 1
fi

# Copy room page example
if cp "$BACKEND_DIR/INTEGRATION_RoomPageExample.tsx" "$FRONTEND_DIR/INTEGRATION_RoomPageExample.tsx"; then
    echo -e "${GREEN}✅ INTEGRATION_RoomPageExample.tsx${NC} → Root folder (reference)"
else
    echo -e "${RED}❌ Failed to copy INTEGRATION_RoomPageExample.tsx${NC}"
    exit 1
fi

echo ""

# Create .env.local if it doesn't exist
echo -e "${BLUE}⚙️  Configuring environment...${NC}"
if [ ! -f "$FRONTEND_DIR/.env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > "$FRONTEND_DIR/.env.local"
    echo -e "${GREEN}✅ .env.local${NC} created with NEXT_PUBLIC_API_URL"
else
    echo -e "${YELLOW}⚠️  .env.local${NC} already exists (not overwritten)"
fi

echo ""

# Summary
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Integration files copied successfully!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}\n"

echo -e "${BLUE}📋 Next Steps:${NC}\n"

echo "1️⃣  Install dependencies:"
echo -e "   ${YELLOW}npm install socket.io-client date-fns${NC}\n"

echo "2️⃣  Update your room page (app/room/[roomId]/page.tsx):"
echo -e "   ${YELLOW}import { ChatSidebar } from '@/app/components/ChatSidebar';${NC}\n"

echo "3️⃣  Add user state in your component:"
echo -e "   ${YELLOW}const [userId] = useState(() => \\\`user-\\\${Math.random().toString(36).substr(2, 9)}\\\`);${NC}"
echo -e "   ${YELLOW}const [userName] = useState(() => \\\`User \\\${Math.floor(Math.random() * 1000)}\\\`);${NC}\n"

echo "4️⃣  Add ChatSidebar to your JSX:"
echo -e "   ${YELLOW}<ChatSidebar roomId={roomId} userId={userId} userName={userName} />${NC}\n"

echo "5️⃣  Start the backend (in another terminal):"
echo -e "   ${YELLOW}npm run dev:watch${NC}\n"

echo "6️⃣  Start the frontend:"
echo -e "   ${YELLOW}npm run dev${NC}\n"

echo "7️⃣  Test:"
echo -e "   ${YELLOW}Open http://localhost:3000 and create a meeting${NC}\n"

echo -e "${BLUE}📚 Reference Files:${NC}"
echo "   • INTEGRATION_RoomPageExample.tsx - Full room page example"
echo "   • ../zoom-clone\\ backend/INTEGRATION_SETUP.md - Setup guide"
echo "   • ../zoom-clone\\ backend/README.md - API reference\n"

echo -e "${GREEN}🎉 Ready to integrate chat into your video call!${NC}\n"
