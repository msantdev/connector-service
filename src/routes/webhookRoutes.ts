import { Router } from 'express';
import { handleWebhook } from '../controllers/webhookController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/webhook', authMiddleware, handleWebhook);

export default router;