[Zoom Clone] PRD
Project: Clone Zoom and its video calling feature
Owner: Jonel Richardson (frontend) and Gary Gonzalez (backend) 
Date: 2/9/2026
Problem
Remote learners at Pursuit Fellowship lose critical learning benefits during weather-related campus closures. While students can access recorded lessons through the platform, they miss real-time interaction, immediate feedback, and peer collaboration that define the in-person learning experience. We need a synchronous video communication tool that recreates the interactivity of physical classrooms without requiring students to travel.

(Optional) Supporting Context:
thousands of small and medium-sized businesses that rely on Zoom to manage their communications
platform was used by more than 70% of the companies in the Fortune 100
a great way to master the art of hybrid work
web-based client eliminates the need for downloads or installations
Zoom’s video and audio quality are consistently high compared to other platforms
Zoom has 300 million daily active users.
89% of people use Zoom for work, while 63% use it for conversations with friends and family
https://www.prosperityforamerica.org/zoom-statistics

Opportunity
In a few sentences: What's the product opportunity?
Build a web-based video conferencing platform that enables real-time, face-to-face collaboration for distributed teams and remote learners through simple URL-based meeting access.


Market Opportunity:
[Market size or growth data]
The Zoom Boom: Why Everyone's Ditching Skype for Video Conferencing
Remote/hybrid work adoption: 58% of US workers now work remotely at least weekly
Education technology demand surged 300% since 2020, sustained at 180% above pre-pandemic levels
Users & Needs
Who: 
Primary users: 
B2B Teams (Small-to-Medium Businesses)
Need: Connect distributed team members across time zones for daily standups, client meetings, and collaborative work sessions
Current Pain: Travel costs average $1,200+ per person per trip; coordination across time zones delays decisions by 24-48 hours
As a remote team lead, I need to host instant video meetings with screen sharing, so that I can conduct effective sprint planning without flying team members to a central office.
Remote Educators & Students
Need: Maintain interactive learning environment during campus closures or for fully remote programs
Current Pain: Asynchronous learning results in 40% lower engagement and 23% higher dropout rates compared to synchronous instruction
As an instructor, I need to see all students simultaneously and share my screen, so that I can deliver interactive lessons and gauge real-time comprehension.
Secondary Users
International Collaborators
Need: Conduct face-to-face meetings with international partners without travel expenses or visa requirements
Current Pain: International business travel costs average $3,000-5,000 per trip; visa processing adds 2-6 week delays
As a business development manager, I need reliable HD video quality across continents, so that I can build trust with international clients without the cost and time of travel.
Proposed Solution
Describe what you're building and how it works in 3-4 sentences. Should be as clear, concrete, and understandable as possible for readers without a lot of background. Example: ”Offer an ‘Uber for private flights’, starting with a mobile app targeted at business travelers.”
We're building a web-based video conferencing application that enables real-time face-to-face collaboration through shareable URL links. Users create or join meetings by accessing a unique meeting URL—no downloads or account creation required for participants. The platform provides HD video/audio streaming, screen sharing capabilities. 
MVP Feature Set (Core Value Props)
[The Vitamin] - 1-to-1 Video Calling
 Maintains status quo: Basic face-to-face communication that replaces phone calls with visual presence. Users can see and hear each other in real-time with stable HD quality.
[The Painkiller] - URL-Based Instant Access
 Solves biggest pain: Eliminates friction of app downloads, account creation, and complex meeting scheduling. Share a link → click → connect in under 10 seconds. Removes the primary barrier preventing impromptu collaboration.
[The Steroid] - Persistent Meeting Rooms
 The magic moment: Same URL works every time for recurring meetings (team standups, office hours, client check-ins). Create your room once, bookmark it, and it becomes your permanent video presence—like having a virtual office that's always accessible.

Goals & Non-Goals
Goals
What we're trying to achieve:
Build a functional video conferencing feature that demonstrates understanding of real-time communication technology
Create a seamless 1-to-1 video calling experience accessible through shareable URLs
Develop production-ready frontend and backend components that could scale to multi-user in future iterations
Business or user benefit:
Users can connect face-to-face remotely without app downloads or complex setup
Pursuit instructors/students can maintain interactive learning during remote class days
Demonstrates technical proficiency with WebRTC, real-time data streaming, and React state management for portfolio
Success outcome:
Two users can initiate and maintain a stable video call with audio for the duration of our demo presentation (minimum 5 minutes)
Meeting URLs can be shared and reused (persistent room functionality)
Basic UI displays video feeds clearly with intuitive controls (mute, camera toggle, hang up)
Non-Goals
What's explicitly out of scope:
Multi-person video calls (3+ participants)
Screen sharing functionality
Chat or messaging features
Recording capabilities
User authentication or account system
Mobile app (web-only for MVP)
Advanced features like virtual backgrounds, filters, or reactions
Production-scale infrastructure (deployment/hosting optimization)
What we're NOT building in this version:
Scheduling or calendar integration
Waiting rooms or meeting passwords
Analytics dashboard for meeting metrics
Custom branding or white-labeling options
Enterprise features (SSO, admin controls, usage reports)

Success Metrics
Goal
Signal
Metric
Target
Functional Core Feature
Video/audio connection works reliably
Successful call completion rate
100% during demo (2/2 attempts)
Usability
Users can join without friction
Time from URL click to connected call
<15 seconds
Stability
Connection remains stable
Call duration without disconnection
5+ minutes continuous
Technical Demonstration
Code quality meets portfolio standards
Clean separation of concerns (components, services, state)
Pass code review checklist


Requirements
Legend
[P0] = MVP for Demo Day presentation (must-have)
[P1] = Important for polished experience (post-MVP)
[P2] = Nice-to-have (future iterations)

Use Case 1: Initiating a Video Call
Context: Primary user journey that demonstrates core functionality. This is what we'll showcase during the demo—a user creating a meeting and sharing the link. Optimizing for simplicity and speed to connection.
Creating a Meeting Room
[P0] User can generate a unique meeting URL by clicking "Create Meeting" button
URL format: yourapp.com/room/[unique-id]
No login required to create room
[P0] User can copy meeting URL to clipboard with one click
Visual confirmation that link was copied (toast notification or button state change)
[P0] User can see their own video preview before joining call
Local camera feed displays immediately on page load
"Your camera is working" confirmation for user confidence
[P1] User can test audio/video before sharing link
Toggle camera on/off to verify functionality
Visual indicator showing mic is detecting audio input
[P2] User can set a display name before joining
[P2] Meeting URLs persist and can be reused for recurring meetings

Use Case 2: Joining a Video Call
Context: Secondary user (call recipient) experience. Must be frictionless since this user didn't initiate and may be less tech-savvy. Optimizing for zero-friction entry.
Accessing Meeting Room
[P0] User can join call by clicking shared meeting URL
No app download required
No account creation required
[P0] User sees clear permission prompts for camera/microphone access
Helpful error messages if permissions denied ("Please allow camera access to join video call")
[P0] User automatically connects to peer when both users are in same room
Connection happens without additional clicks after permissions granted
[P1] User sees loading state while connection establishes
"Connecting..." indicator with progress feedback
[P1] User sees clear error message if connection fails
Actionable suggestion: "Check your internet connection and refresh the page"
[P2] User can preview their camera before joining (like host)

Use Case 3: During Active Video Call
Context: Core video calling experience. Users need reliable connection and basic controls. Optimizing for stability and essential functionality only.
Video & Audio Display
[P0] User can see remote participant's video feed in real-time
Video fills main viewing area (not thumbnail size)
Clear visual quality (minimum 480p)
[P0] User can see their own video feed (picture-in-picture or corner placement)
Smaller than remote feed (typical "self-view" size)
[P0] User can hear remote participant's audio clearly
No echo, minimal latency (under 500ms perceived delay)
[P1] Video feeds resize responsively on window size changes
[P2] User can swap which video feed is primary (enlarge self-view)
Call Controls
[P0] User can mute/unmute their microphone
Visual indicator shows mute status (icon changes, color change)
Mute state visible to both participants
[P0] User can turn camera on/off
Placeholder image or initials shown when camera off
Camera state visible to both participants
[P0] User can end call with "Leave Call" button
Clear, red, prominent button
Ends connection immediately, returns to home screen
[P1] User sees connection quality indicator
Visual signal for poor connection (icon or color change)
[P2] User can adjust audio volume for remote participant

Use Case 4: Technical Requirements (Backend/Infrastructure)
Context: Gary's focus area. These requirements ensure the frontend can reliably connect and stream. Optimizing for MVP functionality without over-engineering.
Signaling & Connection
[P0] Backend provides WebRTC signaling server
Handles offer/answer SDP exchange between peers
Manages ICE candidate exchange
[P0] Backend generates unique room IDs
IDs are URL-safe and unique (UUID or similar)
[P0] Backend supports real-time bidirectional communication (WebSockets or similar)
Maintains persistent connection for signaling
[P1] Backend handles reconnection attempts if connection drops
[P2] Backend limits room capacity to 2 users for MVP (prevents accidental multi-user scenarios)
Data/State Management
[P0] Frontend maintains peer connection state
React state or context tracks connection status (connecting, connected, disconnected)
[P0] Frontend handles local media stream (camera/mic access)
Properly requests permissions
Manages stream lifecycle (cleanup on unmount)
[P1] Frontend provides error boundaries for connection failures
App doesn't crash if WebRTC connection fails
User sees helpful error message instead of white screen

Use Case 5: Error Handling & Edge Cases
Context: What happens when things go wrong. Critical for demo confidence—you need to know app won't break during presentation.
Connection Issues
[P0] User sees clear error if browser doesn't support WebRTC
"Your browser doesn't support video calls. Please use Chrome, Firefox, or Safari."
[P0] User sees clear error if camera/mic permissions denied
"Camera access required to join video call. Click here to update permissions."
[P0] App handles if only one user is in room
Shows "Waiting for other participant..." state
Doesn't crash or show confusing error
[P1] App handles if connection drops mid-call
Attempts automatic reconnection
Shows "Connection lost, reconnecting..." message
[P1] User can manually refresh/reconnect if auto-reconnect fails
Data Validation
[P0] App validates meeting room IDs
Invalid room ID shows "Meeting not found" error, not crash
[P1] App prevents duplicate connections from same user
If user opens same meeting URL in two tabs, handles gracefully

Appendix
Other Resources:
WebRTC documentation: https://webrtc.org/getting-started/overview
PeerJS library: https://peerjs.com/docs
Repo jonelrichardson-spec/zoom-clone


Technical Decisions
Frontend
Framework: Next.js 14
Styling: TailwindCSS
State Management: Zustand
WebRTC Library: PeerJS (handles signaling and peer connections)
Media APIs: getUserMedia (for camera/mic access)
Deployment: Vercel
Backend
Server: Node.js + Express
Signaling: PeerJS Server (manages peer discovery and connection handshake)
Deployment: Railway
Environment: Production URL for signaling (accessible from any device)
Real-Time Communication
Protocol: WebRTC (peer-to-peer video/audio)
Connection Management: PeerJS (abstracts offer/answer/ICE candidate exchange)
STUN Server: Google STUN server (default in PeerJS for NAT traversal)
Connection Type: Direct P2P between two peers after initial signaling
Error Handling:
Browser compatibility checks
Camera/microphone permission handling
Connection failure recovery
Graceful degradation for unsupported browsers
 
### Media Stream API Usage

**Constraints:**
- Video: 720p (1280x720 ideal)
- Audio: Echo cancellation enabled, noise suppression enabled
- Use browser default camera/microphone

**Error Handling:**
- Permission denied → Show clear error message
- No devices found → Inform user to connect camera
- Generic errors → Display error message

**Cleanup:**
- Stop all tracks on component unmount
- Stop tracks when leaving call

getusermedia api

// Simplified getUserMedia for MVP
async function getMediaStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    });
    return stream;
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      throw new Error('Camera/microphone access denied. Please allow permissions.');
    } else if (error.name === 'NotFoundError') {
      throw new Error('No camera or microphone found.');
    } else {
      throw new Error('Error accessing camera/microphone: ' + error.message);
    }
  }
}