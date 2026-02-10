/**
 * Chat Routes
 * REST API endpoints for chat operations
 */
import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';

const router = Router();

// Health check
router.get('/health', ChatController.healthCheck);

// Chat room endpoints
router.post('/rooms', ChatController.createRoom);
router.get('/rooms/:roomId', ChatController.getRoom);
router.get('/rooms/:roomId/messages', ChatController.getMessages);
router.post('/rooms/:roomId/participants', ChatController.addParticipant);
router.delete('/rooms/:roomId/participants/:userId', ChatController.removeParticipant);
router.get('/rooms/:roomId/typing', ChatController.getTypingUsers);

// Meeting endpoints
router.get('/meetings/:meetingId/rooms', ChatController.getRoomsByMeeting);

export default router;
