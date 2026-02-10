/**
 * PeerJS Server Configuration
 *
 * HOW TO SWITCH TO GARY'S RAILWAY BACKEND:
 * 1. Deploy the PeerJS server to Railway (see backend repo)
 * 2. Get the Railway public URL (e.g. zoom-clone-backend.up.railway.app)
 * 3. Uncomment the "production" config below and comment out the "development" config
 * 4. Redeploy the frontend to Vercel
 */

export const PEER_CONFIG = {
  // ── Development: PeerJS public cloud server ──
  host: "0.peerjs.com",
  port: 443,
  path: "/",
  secure: true,

  // ── Production: Gary's Railway backend (uncomment when ready) ──
  // host: "zoom-clone-backend.up.railway.app",
  // port: 443,
  // path: "/peerjs",
  // secure: true,
};

/** STUN/TURN servers for NAT traversal */
export const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};
