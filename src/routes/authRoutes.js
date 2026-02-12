import express from 'express';
import { register, login, refreshAccessToken, logout } from '../controllers/authController.js';
import { apiMiddleware } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.use(authLimiter);

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

router.post('/logout', apiMiddleware, logout);

export default router;