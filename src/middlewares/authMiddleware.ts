import { Request, Response, NextFunction, RequestHandler } from 'express';
import dbClient from '../config/database';
import { RequestWithUser, User } from '../types'; 
import { validate } from '../schemas/telegramMessageSchema';
import { error, info } from '../utils/logger';
import { getUserById } from '../services/userService';

export const authMiddleware: RequestHandler = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const isValid = validate(req.body);

    if (!isValid) {
      error('Invalid Telegram message format', validate.errors); 
      return res.status(400).json({ status: 'error', message: 'Invalid Telegram message format', errors: validate.errors });
    }

    const telegramUserId = req.body.message?.from?.id;

    if (!telegramUserId) {
      error('Invalid Telegram user ID');
      return res.status(400).json({ status: 'error', message: 'Invalid Telegram user ID' });
    }

    const client = dbClient;

    await client.rpc('BEGIN');

    const userResult = await getUserById(telegramUserId)

    await client.rpc('COMMIT');

    if (!userResult) {
      error('User not authorized'); 
      return res.status(403).json({ status: 'error', message: 'User not authorized' });
    }

    req.user = userResult

    info(`User ${req?.user?.telegram_id} authenticated`); 

    next();
  } catch (err) {
    error('Internal server error', err); 
    console.error('Error in authMiddleware:', err); 
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

