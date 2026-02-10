/**
 * Chat Controller
 * Handles REST API endpoints for chat operations
 */
import { Request, Response } from 'express';
import { chatService } from '../services/ChatService';

export class ChatController {
  /**
   * Create a new chat room
   * POST /api/chat/rooms
   */
  static createRoom(req: Request, res: Response): void {
    try {
      const { meetingId, roomName, userId } = req.body;

      if (!meetingId || !roomName || !userId) {
        res.status(400).json({
          error: 'Missing required fields: meetingId, roomName, userId',
        });
        return;
      }

      const room = chatService.createRoom(meetingId, roomName, userId);

      res.status(201).json({
        success: true,
        data: room,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create chat room',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get chat room by ID
   * GET /api/chat/rooms/:roomId
   */
  static getRoom(req: Request, res: Response): void {
    try {
      const roomId = Array.isArray(req.params.roomId)
        ? req.params.roomId[0]
        : req.params.roomId;

      const room = chatService.getRoom(roomId);

      if (!room) {
        res.status(404).json({
          error: 'Chat room not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: room,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch chat room',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get messages for a room
   * GET /api/chat/rooms/:roomId/messages
   */
  static getMessages(req: Request, res: Response): void {
    try {
      const roomId = Array.isArray(req.params.roomId)
        ? req.params.roomId[0]
        : req.params.roomId;
      const { limit = '50', offset = '0' } = req.query;

      const messages = chatService.getMessages(
        roomId,
        parseInt(limit as string),
        parseInt(offset as string)
      );

      res.status(200).json({
        success: true,
        data: messages,
        count: messages.length,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch messages',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get rooms for a meeting
   * GET /api/chat/meetings/:meetingId/rooms
   */
  static getRoomsByMeeting(req: Request, res: Response): void {
    try {
      const meetingId = Array.isArray(req.params.meetingId)
        ? req.params.meetingId[0]
        : req.params.meetingId;

      const rooms = chatService.getRoomsByMeeting(meetingId);

      res.status(200).json({
        success: true,
        data: rooms,
        count: rooms.length,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch rooms',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Add participant to room
   * POST /api/chat/rooms/:roomId/participants
   */
  static addParticipant(req: Request, res: Response): void {
    try {
      const roomId = Array.isArray(req.params.roomId)
        ? req.params.roomId[0]
        : req.params.roomId;
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({
          error: 'Missing required field: userId',
        });
        return;
      }

      const success = chatService.addParticipant(roomId, userId);

      if (!success) {
        res.status(404).json({
          error: 'Chat room not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Participant added successfully',
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to add participant',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Remove participant from room
   * DELETE /api/chat/rooms/:roomId/participants/:userId
   */
  static removeParticipant(req: Request, res: Response): void {
    try {
      const roomId = Array.isArray(req.params.roomId)
        ? req.params.roomId[0]
        : req.params.roomId;
      const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;

      const success = chatService.removeParticipant(roomId, userId);

      if (!success) {
        res.status(404).json({
          error: 'Chat room not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Participant removed successfully',
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to remove participant',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get typing users in a room
   * GET /api/chat/rooms/:roomId/typing
   */
  static getTypingUsers(req: Request, res: Response): void {
    try {
      const roomId = Array.isArray(req.params.roomId)
        ? req.params.roomId[0]
        : req.params.roomId;

      const typingUsers = chatService.getTypingUsers(roomId);

      res.status(200).json({
        success: true,
        data: typingUsers,
        count: typingUsers.length,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch typing users',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Health check endpoint
   * GET /api/chat/health
   */
  static healthCheck(req: Request, res: Response): void {
    res.status(200).json({
      success: true,
      message: 'Chat service is running',
      timestamp: new Date(),
    });
  }
}
