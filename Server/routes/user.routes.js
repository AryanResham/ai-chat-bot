import {Router} from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {createUser, fetchChatDetails} from '../controllers/users.controllers.js';

const router = Router();

router.post('/signup', createUser);
router.get('/chat-details', authenticateToken, fetchChatDetails);

export default router;