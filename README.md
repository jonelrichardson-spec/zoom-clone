# Zoom Clone

A 1-to-1 browser-based video calling app built with WebRTC. Users create or join a room and connect via live audio and video. I built the entire frontend: room creation/join flow, video grid layout, mute/camera controls, and Socket.io client integration.

Built during Pursuit's AI-Native Builder Fellowship (February 2026) with teammate Gary on backend.

## What I Learned

The trickiest part was understanding the WebRTC event sequence: signaling must complete before the peer connection opens, and the peer connection must open before media streams attach. Getting the order wrong causes silent failures. PeerJS abstracts the handshake without hiding how it works; Socket.io handles the signaling server that makes peer discovery possible even in a "peer-to-peer" setup.

## Tech Stack

- **Frontend**: Next.js 14 · TypeScript · Tailwind CSS · PeerJS · Socket.io
- **Backend**: Node.js · Railway

## Team

- Jonel Richardson (frontend)
- Gary (backend)

## Live Demo

[zoom-clone-beta-henna.vercel.app](https://zoom-clone-beta-henna.vercel.app/room/719251ee)

## Repo

[jonelrichardson-spec/zoom-clone](https://github.com/jonelrichardson-spec/zoom-clone)
