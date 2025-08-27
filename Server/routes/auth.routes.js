import {Router} from 'express';
import { loginUser, logoutUser, refreshAccessToken, authenticateMe } from '../controllers/auth.controllers.js';

const router = Router();


router.get('/me', authenticateMe);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshAccessToken);

export default router;