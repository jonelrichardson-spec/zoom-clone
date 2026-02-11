module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/zoom-clone-backup/lib/peerConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PeerJS Server Configuration
 *
 * HOW TO SWITCH TO GARY'S RAILWAY BACKEND:
 * 1. Deploy the PeerJS server to Railway (see backend repo)
 * 2. Get the Railway public URL (e.g. zoom-clone-backend.up.railway.app)
 * 3. Uncomment the "production" config below and comment out the "development" config
 * 4. Redeploy the frontend to Vercel
 */ __turbopack_context__.s([
    "ICE_SERVERS",
    ()=>ICE_SERVERS,
    "PEER_CONFIG",
    ()=>PEER_CONFIG
]);
const PEER_CONFIG = {
    // ── Development: PeerJS public cloud server ──
    host: "0.peerjs.com",
    port: 443,
    path: "/",
    secure: true
};
const ICE_SERVERS = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: "stun:stun1.l.google.com:19302"
        }
    ]
};
}),
"[project]/Desktop/zoom-clone-backup/lib/browserCheck.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkBrowserSupport",
    ()=>checkBrowserSupport,
    "isValidRoomId",
    ()=>isValidRoomId
]);
function checkBrowserSupport() {
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            supported: false,
            message: ""
        };
    }
    //TURBOPACK unreachable
    ;
}
function isValidRoomId(id) {
    return /^[a-zA-Z0-9_-]{4,36}$/.test(id);
}
}),
"[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoomPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/zoom-clone-backup/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/zoom-clone-backup/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$peerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/zoom-clone-backup/lib/peerConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$browserCheck$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/zoom-clone-backup/lib/browserCheck.ts [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'lucide-react'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
const MAX_RECONNECT = 3;
const RECONNECT_DELAY = 2000;
function RoomPage({ params }) {
    const { roomId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    // ── Refs ─────────────────────────────────────────────
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const peerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const callRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const remoteStreamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const roleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("host");
    const PeerJSRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // ── Preview State ────────────────────────────────────
    const [isPreviewing, setIsPreviewing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [previewCameras, setPreviewCameras] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [previewMicrophones, setPreviewMicrophones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCamera, setSelectedCamera] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedMicrophone, setSelectedMicrophone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [previewIsMuted, setPreviewIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewIsCameraOff, setPreviewIsCameraOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewLoading, setPreviewLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [previewError, setPreviewError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // ── State ────────────────────────────────────────────
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("requesting");
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCameraOff, setIsCameraOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [peerLeft, setPeerLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reconnectAttempt, setReconnectAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // ── Callback refs for video elements ─────────────────
    const localVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const previewVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    function attachLocalVideo(el) {
        localVideoRef.current = el;
        if (el && streamRef.current) {
            el.srcObject = streamRef.current;
        }
    }
    function attachPreviewVideo(el) {
        previewVideoRef.current = el;
        if (el && streamRef.current) {
            el.srcObject = streamRef.current;
        }
    }
    const remoteVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    function attachRemoteVideo(el) {
        remoteVideoRef.current = el;
        if (el && remoteStreamRef.current) {
            el.srcObject = remoteStreamRef.current;
        }
    }
    // ── Preview: Enumerate Devices ──────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function enumerateDevices() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const cameras = devices.filter((d)=>d.kind === "videoinput").map((d)=>({
                        deviceId: d.deviceId,
                        label: d.label || `Camera ${d.deviceId.slice(0, 5)}`
                    }));
                const mics = devices.filter((d)=>d.kind === "audioinput").map((d)=>({
                        deviceId: d.deviceId,
                        label: d.label || `Microphone ${d.deviceId.slice(0, 5)}`
                    }));
                setPreviewCameras(cameras);
                setPreviewMicrophones(mics);
                setSelectedCamera(cameras[0]?.deviceId || "");
                setSelectedMicrophone(mics[0]?.deviceId || "");
            } catch  {
                setPreviewError("Unable to enumerate devices");
            }
        }
        enumerateDevices();
    }, []);
    // ── Preview: Request Camera Stream ──────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isPreviewing) return;
        setPreviewLoading(true);
        setPreviewError("");
        const requestPreviewStream = async ()=>{
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: selectedCamera ? {
                        deviceId: {
                            exact: selectedCamera
                        }
                    } : true,
                    audio: selectedMicrophone ? {
                        deviceId: {
                            exact: selectedMicrophone
                        }
                    } : true
                });
                streamRef.current = stream;
                setPreviewLoading(false);
                // Apply initial mute/camera states
                stream.getAudioTracks().forEach((track)=>{
                    track.enabled = !previewIsMuted;
                });
                stream.getVideoTracks().forEach((track)=>{
                    track.enabled = !previewIsCameraOff;
                });
            } catch (err) {
                setPreviewLoading(false);
                if (err instanceof DOMException) {
                    if (err.name === "NotAllowedError") {
                        setPreviewError("Camera access denied. Enable it in your browser settings.");
                    } else if (err.name === "NotFoundError") {
                        setPreviewError("No camera or microphone found.");
                    } else if (err.name === "NotReadableError") {
                        setPreviewError("Camera is in use by another app. Close it and try again.");
                    } else {
                        setPreviewError(err.message);
                    }
                } else {
                    setPreviewError("Failed to access camera.");
                }
            }
        };
        requestPreviewStream();
        return ()=>{
        // Don't stop stream here; we need it for the call
        };
    }, [
        isPreviewing,
        selectedCamera,
        selectedMicrophone
    ]);
    // ── Preview: Switch Camera ──────────────────────────
    const switchCamera = async (deviceId)=>{
        setSelectedCamera(deviceId);
        if (streamRef.current) {
            streamRef.current.getVideoTracks().forEach((track)=>track.stop());
        }
    };
    // ── Preview: Switch Microphone ──────────────────────
    const switchMicrophone = async (deviceId)=>{
        setSelectedMicrophone(deviceId);
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach((track)=>track.stop());
        }
    };
    // ── Preview: Toggle Mute ────────────────────────────
    const togglePreviewMute = ()=>{
        if (!streamRef.current) return;
        streamRef.current.getAudioTracks().forEach((track)=>{
            track.enabled = previewIsMuted;
        });
        setPreviewIsMuted(!previewIsMuted);
    };
    // ── Preview: Toggle Camera ──────────────────────────
    const togglePreviewCamera = ()=>{
        if (!streamRef.current) return;
        streamRef.current.getVideoTracks().forEach((track)=>{
            track.enabled = previewIsCameraOff;
        });
        setPreviewIsCameraOff(!previewIsCameraOff);
    };
    // ── Preview: Join Meeting ──────────────────────────
    const handleJoinMeeting = async ()=>{
        // Stream is ready, transition to call
        setIsPreviewing(false);
        setState("connecting");
    };
    // ── Main effect ──────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isPreviewing) return; // Don't start call setup while previewing
        // Browser support check
        const { supported, message } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$browserCheck$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkBrowserSupport"])();
        if (!supported) {
            setState("error");
            setErrorMessage(message);
            return;
        }
        // Validate room ID
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$browserCheck$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidRoomId"])(roomId)) {
            setState("error");
            setErrorMessage("Invalid meeting link. Please check the URL and try again.");
            return;
        }
        let cancelled = false;
        // ── Call setup helper ──────────────────────────────
        function setupCall(call) {
            callRef.current = call;
            call.on("stream", (remoteStream)=>{
                remoteStreamRef.current = remoteStream;
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream;
                }
                reconnectCountRef.current = 0;
                setReconnectAttempt(0);
                setState("connected");
                setPeerLeft(false);
            });
            call.on("close", ()=>{
                remoteStreamRef.current = null;
                setState("waiting");
                setPeerLeft(true);
            });
            call.on("error", (err)=>{
                setState("error");
                setErrorMessage(`Call error: ${err.message}`);
            });
        }
        // ── Reconnection logic ──────────────────────────────
        function attachReconnection(peer) {
            peer.on("disconnected", ()=>{
                if (cancelled) return;
                if (reconnectCountRef.current >= MAX_RECONNECT) {
                    setState("error");
                    setErrorMessage("Connection lost. Please refresh and try again.");
                    return;
                }
                setState("reconnecting");
                setReconnectAttempt((prev)=>prev + 1);
                reconnectCountRef.current += 1;
                setTimeout(()=>{
                    if (cancelled) return;
                    peer.reconnect();
                }, RECONNECT_DELAY);
            });
        }
        // ── Join as joiner ──────────────────────────────────
        function connectAsJoiner(PeerJS, stream) {
            if (cancelled) return;
            roleRef.current = "joiner";
            const peer = new PeerJS({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$peerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PEER_CONFIG"],
                config: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$peerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SERVERS"]
            });
            peerRef.current = peer;
            peer.on("open", ()=>{
                if (cancelled) return;
                const call = peer.call(roomId, stream);
                setupCall(call);
                attachReconnection(peer);
            });
            peer.on("error", (err)=>{
                if (cancelled) return;
                setState("error");
                setErrorMessage("Connection failed. Check your internet connection and try again.");
            });
        }
        // ── Main init ──────────────────────────────────────
        async function init() {
            // Stream already exists from preview, just use it
            if (!streamRef.current) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true
                        }
                    });
                    streamRef.current = stream;
                } catch (err) {
                    if (cancelled) return;
                    setState("error");
                    if (err instanceof DOMException) {
                        switch(err.name){
                            case "NotAllowedError":
                                setErrorMessage("Camera access denied. Click the camera icon in your browser's address bar to allow access, then refresh.");
                                break;
                            case "NotFoundError":
                                setErrorMessage("No camera or microphone detected. Please connect a device and refresh.");
                                break;
                            case "NotReadableError":
                                setErrorMessage("Camera or microphone is in use by another application. Close it and refresh.");
                                break;
                            case "OverconstrainedError":
                                setErrorMessage("Camera doesn't support the requested resolution. Please try a different browser.");
                                break;
                            default:
                                setErrorMessage(err.message);
                        }
                    } else {
                        setErrorMessage("An unexpected error occurred accessing your camera.");
                    }
                    return;
                }
            }
            if (cancelled) {
                streamRef.current?.getTracks().forEach((t)=>t.stop());
                return;
            }
            setState("connecting");
            // Step 2: Load PeerJS
            const { default: PeerJS } = await __turbopack_context__.A("[project]/Desktop/zoom-clone-backup/node_modules/peerjs/dist/bundler.mjs [app-ssr] (ecmascript, async loader)");
            PeerJSRef.current = PeerJS;
            if (cancelled) {
                streamRef.current?.getTracks().forEach((t)=>t.stop());
                return;
            }
            // Step 3: Try to register as host (peer ID = roomId)
            roleRef.current = "host";
            const peer = new PeerJS(roomId, {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$peerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PEER_CONFIG"],
                config: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$lib$2f$peerConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ICE_SERVERS"]
            });
            peerRef.current = peer;
            peer.on("open", ()=>{
                if (cancelled) return;
                setState("waiting");
                // Only NOW attach reconnection — after we know we're the host
                attachReconnection(peer);
            });
            peer.on("call", (call)=>{
                if (cancelled) return;
                call.answer(streamRef.current);
                setupCall(call);
            });
            // No peer.on("disconnected") here! It's attached inside "open" above.
            // This prevents destroy() in the unavailable-id handler from
            // triggering a false reconnection loop.
            peer.on("error", (err)=>{
                if (cancelled) return;
                if (err.type === "unavailable-id") {
                    // Expected for 2nd user — destroy this peer and join as caller
                    peer.destroy();
                    connectAsJoiner(PeerJS, streamRef.current);
                } else {
                    setState("error");
                    setErrorMessage("Connection failed. Check your internet connection and try again.");
                }
            });
        }
        init();
        return ()=>{
            cancelled = true;
            callRef.current?.close();
            peerRef.current?.destroy();
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((t)=>t.stop());
                streamRef.current = null;
            }
        };
    }, [
        roomId,
        isPreviewing
    ]);
    // ── Controls ─────────────────────────────────────────
    function toggleMute() {
        if (!streamRef.current) return;
        streamRef.current.getAudioTracks().forEach((t)=>{
            t.enabled = !t.enabled;
        });
        setIsMuted((m)=>!m);
    }
    function toggleCamera() {
        if (!streamRef.current) return;
        streamRef.current.getVideoTracks().forEach((t)=>{
            t.enabled = !t.enabled;
        });
        setIsCameraOff((c)=>!c);
    }
    function leaveCall() {
        callRef.current?.close();
        peerRef.current?.destroy();
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t)=>t.stop());
            streamRef.current = null;
        }
        window.location.href = "/";
    }
    // ── Derived ──────────────────────────────────────────
    const showVideo = state === "connecting" || state === "waiting" || state === "connected" || state === "reconnecting";
    // ── Status text for screen readers ───────────────────
    const statusText = state === "requesting" ? "Requesting camera access" : state === "connecting" ? "Connecting to server" : state === "waiting" ? peerLeft ? "Participant left the call" : "Waiting for participant" : state === "connected" ? "Call connected" : state === "reconnecting" ? "Reconnecting" : "Error";
    // ── PREVIEW SCREEN ──────────────────────────────────
    if (isPreviewing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen flex-col bg-slate-900 text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "border-b border-white/10 px-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold",
                            children: "Join Meeting"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 485,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-slate-400",
                            children: [
                                "Room: ",
                                roomId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 486,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                    lineNumber: 484,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 sm:flex-row sm:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full flex-col items-center gap-4 sm:w-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative aspect-video w-full max-w-xl overflow-hidden rounded-2xl bg-slate-800 shadow-2xl",
                                children: [
                                    previewLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 flex items-center justify-center bg-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 496,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 495,
                                        columnNumber: 17
                                    }, this),
                                    !previewLoading && previewError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 flex items-center justify-center bg-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraOff, {
                                                    className: "mx-auto mb-2 h-12 w-12 text-red-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-red-300",
                                                    children: previewError
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 501,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 500,
                                        columnNumber: 17
                                    }, this),
                                    !previewError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        ref: attachPreviewVideo,
                                        autoPlay: true,
                                        playsInline: true,
                                        muted: true,
                                        className: `h-full w-full object-cover ${previewLoading ? "hidden" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 508,
                                        columnNumber: 17
                                    }, this),
                                    previewIsCameraOff && !previewError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 flex items-center justify-center bg-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraOff, {
                                            className: "h-16 w-16 text-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 520,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 519,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 492,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full flex-col gap-6 sm:w-96",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mb-2 flex items-center gap-2 text-sm font-semibold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Camera, {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 17
                                                }, this),
                                                "Camera"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 530,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedCamera,
                                            onChange: (e)=>switchCamera(e.target.value),
                                            className: "w-full rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none",
                                            children: previewCameras.map((cam)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: cam.deviceId,
                                                    children: cam.label
                                                }, cam.deviceId, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 534,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 529,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mb-2 flex items-center gap-2 text-sm font-semibold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Mic, {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 17
                                                }, this),
                                                "Microphone"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 549,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedMicrophone,
                                            onChange: (e)=>switchMicrophone(e.target.value),
                                            className: "w-full rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none",
                                            children: previewMicrophones.map((mic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: mic.deviceId,
                                                    children: mic.label
                                                }, mic.deviceId, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 553,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3 rounded-lg border border-white/10 bg-slate-800/50 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: togglePreviewMute,
                                            className: `flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${previewIsMuted ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-white/10 text-white hover:bg-white/20"}`,
                                            children: [
                                                previewIsMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MicOff, {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Mic, {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 579,
                                                    columnNumber: 19
                                                }, this),
                                                previewIsMuted ? "Unmute" : "Mute"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 568,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: togglePreviewCamera,
                                            className: `flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${previewIsCameraOff ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-white/10 text-white hover:bg-white/20"}`,
                                            children: [
                                                previewIsCameraOff ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraOff, {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 592,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Camera, {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                    lineNumber: 594,
                                                    columnNumber: 19
                                                }, this),
                                                previewIsCameraOff ? "Camera Off" : "Camera On"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 583,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleJoinMeeting,
                                    disabled: previewLoading || !!previewError,
                                    className: "flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-600 disabled:text-slate-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Play, {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                            lineNumber: 606,
                                            columnNumber: 15
                                        }, this),
                                        "Join Meeting"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 601,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 527,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                    lineNumber: 490,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
            lineNumber: 482,
            columnNumber: 7
        }, this);
    }
    // ── CALL SCREEN ──────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen flex-col bg-black text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-semibold",
                                    children: [
                                        "Meeting ",
                                        roomId
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 622,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400 sm:text-sm",
                                    children: [
                                        state === "waiting" && (peerLeft ? "Participant left" : "Waiting for participant..."),
                                        state === "connected" && "Connected",
                                        state === "connecting" && "Connecting...",
                                        state === "reconnecting" && `Reconnecting (${reconnectAttempt}/${MAX_RECONNECT})`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 623,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 621,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-medium text-slate-400",
                            children: statusText
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 630,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                    lineNumber: 620,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                lineNumber: 619,
                columnNumber: 7
            }, this),
            state === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex flex-1 items-center justify-center px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md rounded-lg border border-red-500/50 bg-red-500/10 p-6 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-2 text-lg font-semibold text-red-400",
                            children: "Connection Error"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 640,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-4 text-sm text-red-300",
                            children: errorMessage
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 643,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.href = "/",
                            className: "rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700",
                            children: "Go Back Home"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 644,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                    lineNumber: 639,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                lineNumber: 638,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex flex-1 flex-col items-center justify-center overflow-hidden px-2 py-4 sm:px-4 sm:py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full w-full max-w-5xl flex-col items-center justify-center gap-4",
                    children: [
                        remoteStreamRef.current && state === "connected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full flex-1 overflow-hidden rounded-2xl bg-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    ref: attachRemoteVideo,
                                    autoPlay: true,
                                    playsInline: true,
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 658,
                                    columnNumber: 17
                                }, this),
                                state !== "connected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center justify-center bg-black/50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2 h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                lineNumber: 667,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-300",
                                                children: "Loading video..."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                lineNumber: 668,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 666,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 665,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white",
                                    children: "Remote"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 672,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 657,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: state === "connected" ? "absolute bottom-3 right-3 z-10 aspect-video w-36 overflow-hidden rounded-xl border-2 border-white/20 bg-black shadow-lg transition-all sm:bottom-4 sm:right-4 sm:w-48" : "relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    ref: attachLocalVideo,
                                    autoPlay: true,
                                    playsInline: true,
                                    muted: true,
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 686,
                                    columnNumber: 15
                                }, this),
                                isCameraOff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center justify-center bg-slate-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "32",
                                        height: "32",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "#94a3b8",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "1",
                                                y1: "1",
                                                x2: "23",
                                                y2: "23"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                lineNumber: 706,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                                lineNumber: 707,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 695,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 694,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white",
                                    children: "You"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 711,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 679,
                            columnNumber: 13
                        }, this),
                        state === "connecting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-black/70 px-4 py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 719,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-300",
                                    children: "Connecting to server..."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 720,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 718,
                            columnNumber: 15
                        }, this),
                        state === "waiting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-black/70 px-4 py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 w-2 animate-pulse rounded-full bg-yellow-400"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 728,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-300",
                                    children: peerLeft ? "Participant left the call" : "Waiting for participant..."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 729,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 727,
                            columnNumber: 15
                        }, this),
                        state === "reconnecting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-yellow-900/80 px-4 py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-3 w-3 animate-spin rounded-full border-2 border-yellow-200/30 border-t-yellow-200"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 739,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-yellow-200",
                                    children: [
                                        "Connection lost. Trying again (",
                                        reconnectAttempt,
                                        "/",
                                        MAX_RECONNECT,
                                        ")..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                    lineNumber: 740,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 738,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                    lineNumber: 654,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                lineNumber: 653,
                columnNumber: 9
            }, this),
            showVideo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "flex shrink-0 items-center justify-center border-t border-white/10 px-4 py-3 sm:py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleMute,
                            "aria-label": isMuted ? "Unmute microphone" : "Mute microphone",
                            className: `flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12 ${isMuted ? "bg-red-500/20 hover:bg-red-500/30" : "bg-white/10 hover:bg-white/20"}`,
                            children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "#ef4444",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "1",
                                        y1: "1",
                                        x2: "23",
                                        y2: "23"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 776,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 777,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.13 1.48-.35 2.17"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 778,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "12",
                                        y1: "19",
                                        x2: "12",
                                        y2: "23"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 779,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "8",
                                        y1: "23",
                                        x2: "16",
                                        y2: "23"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 780,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                lineNumber: 765,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "white",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 794,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M19 10v2a7 7 0 0 1-14 0v-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 795,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "12",
                                        y1: "19",
                                        x2: "12",
                                        y2: "23"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 796,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "8",
                                        y1: "23",
                                        x2: "16",
                                        y2: "23"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 797,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                lineNumber: 783,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 755,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleCamera,
                            "aria-label": isCameraOff ? "Turn camera on" : "Turn camera off",
                            className: `flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12 ${isCameraOff ? "bg-red-500/20 hover:bg-red-500/30" : "bg-white/10 hover:bg-white/20"}`,
                            children: isCameraOff ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "#ef4444",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "1",
                                        y1: "1",
                                        x2: "23",
                                        y2: "23"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 824,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                lineNumber: 813,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "white",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "23 7 16 12 23 17 23 7"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 839,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "1",
                                        y: "5",
                                        width: "15",
                                        height: "14",
                                        rx: "2",
                                        ry: "2"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 840,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                lineNumber: 828,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 803,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: leaveCall,
                            "aria-label": "Leave call",
                            className: "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "white",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 862,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$zoom$2d$clone$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "23",
                                        y1: "1",
                                        x2: "1",
                                        y2: "23"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                        lineNumber: 863,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                                lineNumber: 851,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                            lineNumber: 846,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                    lineNumber: 753,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
                lineNumber: 752,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/zoom-clone-backup/app/room/[roomId]/page.tsx",
        lineNumber: 617,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/zoom-clone-backup/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Desktop/zoom-clone-backup/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/zoom-clone-backup/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Desktop/zoom-clone-backup/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/zoom-clone-backup/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a82e5b9._.js.map