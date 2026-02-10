@echo off
REM ============================================================================
REM Zoom Clone - Frontend Integration Setup Script (Windows)
REM Automatically copies chat integration files to your Next.js frontend
REM ============================================================================

setlocal enabledelayedexpansion

REM Color codes (Windows 10+)
set "GREEN=[92m"
set "BLUE=[94m"
set "RED=[91m"
set "YELLOW=[93m"
set "NC=[0m"

echo.
echo %BLUE%============================================================%NC%
echo %BLUE%  Zoom Clone - Frontend Chat Integration Setup%NC%
echo %BLUE%============================================================%NC%
echo.

REM Get the directory where this script is located (backend directory)
set "BACKEND_DIR=%~dp0"
set "BACKEND_DIR=%BACKEND_DIR:~0,-1%"

REM Get frontend path from argument or use current directory
if "%1"=="" (
    set "FRONTEND_DIR=."
) else (
    set "FRONTEND_DIR=%1"
)

REM Check if backend files exist
if not exist "%BACKEND_DIR%\INTEGRATION_socketService.ts" (
    echo %RED%❌ Error: Cannot find INTEGRATION_socketService.ts%NC%
    echo %YELLOW%Make sure you run this script from the backend directory%NC%
    pause
    exit /b 1
)

echo %YELLOW%📁 Source (Backend): %BACKEND_DIR%%NC%
echo %YELLOW%📁 Target (Frontend): %FRONTEND_DIR%%NC%
echo.

REM Create directories
echo %BLUE%📂 Creating directory structure...%NC%
if not exist "%FRONTEND_DIR%\app\lib\chat" mkdir "%FRONTEND_DIR%\app\lib\chat"
if not exist "%FRONTEND_DIR%\app\hooks" mkdir "%FRONTEND_DIR%\app\hooks"
if not exist "%FRONTEND_DIR%\app\components" mkdir "%FRONTEND_DIR%\app\components"
echo %GREEN%✅ Directories created%NC%
echo.

REM Copy files
echo %BLUE%📋 Copying integration files...%NC%

copy "%BACKEND_DIR%\INTEGRATION_socketService.ts" "%FRONTEND_DIR%\app\lib\chat\socketService.ts" >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ Failed to copy socketService.ts%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ socketService.ts%NC% ^-> app/lib/chat/socketService.ts

copy "%BACKEND_DIR%\INTEGRATION_useChat.ts" "%FRONTEND_DIR%\app\hooks\useChat.ts" >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ Failed to copy useChat.ts%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ useChat.ts%NC% ^-> app/hooks/useChat.ts

copy "%BACKEND_DIR%\INTEGRATION_ChatSidebar.tsx" "%FRONTEND_DIR%\app\components\ChatSidebar.tsx" >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ Failed to copy ChatSidebar.tsx%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ ChatSidebar.tsx%NC% ^-> app/components/ChatSidebar.tsx

copy "%BACKEND_DIR%\INTEGRATION_RoomPageExample.tsx" "%FRONTEND_DIR%\INTEGRATION_RoomPageExample.tsx" >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ Failed to copy INTEGRATION_RoomPageExample.tsx%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ INTEGRATION_RoomPageExample.tsx%NC% ^-> Root folder (reference)

echo.

REM Create .env.local if it doesn't exist
echo %BLUE%⚙️  Configuring environment...%NC%
if not exist "%FRONTEND_DIR%\.env.local" (
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:3001
    ) > "%FRONTEND_DIR%\.env.local"
    echo %GREEN%✅ .env.local%NC% created with NEXT_PUBLIC_API_URL
) else (
    echo %YELLOW%⚠️  .env.local%NC% already exists (not overwritten)
)

echo.

REM Summary
echo %BLUE%============================================================%NC%
echo %GREEN%✅ Integration files copied successfully!%NC%
echo %BLUE%============================================================%NC%
echo.

echo %BLUE%📋 Next Steps:%NC%
echo.

echo 1️⃣  Install dependencies:
echo    %YELLOW%npm install socket.io-client date-fns%NC%
echo.

echo 2️⃣  Update your room page (app/room/[roomId]/page.tsx):
echo    %YELLOW%import { ChatSidebar } from '@/app/components/ChatSidebar';%NC%
echo.

echo 3️⃣  Add user state in your component:
echo    %YELLOW%const [userId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);%NC%
echo    %YELLOW%const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);%NC%
echo.

echo 4️⃣  Add ChatSidebar to your JSX:
echo    %YELLOW%^<ChatSidebar roomId={roomId} userId={userId} userName={userName} /^>%NC%
echo.

echo 5️⃣  Start the backend (in another terminal):
echo    %YELLOW%npm run dev:watch%NC%
echo.

echo 6️⃣  Start the frontend:
echo    %YELLOW%npm run dev%NC%
echo.

echo 7️⃣  Test:
echo    %YELLOW%Open http://localhost:3000 and create a meeting%NC%
echo.

echo %BLUE%📚 Reference Files:%NC%
echo    • INTEGRATION_RoomPageExample.tsx - Full room page example
echo    • ..\zoom-clone backend\INTEGRATION_SETUP.md - Setup guide
echo    • ..\zoom-clone backend\README.md - API reference
echo.

echo %GREEN%🎉 Ready to integrate chat into your video call!%NC%
echo.

pause
