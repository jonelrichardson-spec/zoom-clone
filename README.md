📹 Zoom Clone
Team: Gary (backend) | Built: February 2026
A 1-to-1 browser-based video calling app using WebRTC. Users create or join a room and connect via live audio and video. I built the entire frontend: room creation/join flow, video grid layout, mute/camera controls, and Socket.io client integration.
The trickiest part was understanding the WebRTC event sequence: signaling must complete before the peer connection opens, and the peer connection must open before media streams attach. Getting the order wrong causes silent failures. PeerJS abstracts the handshake without hiding how it works; Socket.io handles the signaling server that makes peer discovery possible even in a "peer-to-peer" setup.
Stack: Next.js 14 · TypeScript · Tailwind CSS · PeerJS · Socket.io · Node.js · Railway
Live Demo: zoom-clone-beta-henna.vercel.app | Repo: jonelrichardson-spec/zoom-clone
