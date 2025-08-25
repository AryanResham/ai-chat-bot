import {Router} from 'express';
import {loginUser, createUser} from '../controllers/users.controllers.js';

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

export default router;