import {Router} from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { handleUserMessage, createNewConversation, getAllChatDetails } from '../controllers/chat.controllers.js';

const router = Router();

router.post('/new', authenticateToken, createNewConversation);
router.post('/:id/message', authenticateToken, handleUserMessage);
router.get('/all', authenticateToken, getAllChatDetails);




export default router;
