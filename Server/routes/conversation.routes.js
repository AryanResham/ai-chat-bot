import {Router} from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { handleUserMessage, createNewConversation } from '../controllers/conversation.controllers.js';

const router = Router();

router.post('/new-convo', authenticateToken, createNewConversation);
router.post('/:id/message', authenticateToken, handleUserMessage);


export default router;
