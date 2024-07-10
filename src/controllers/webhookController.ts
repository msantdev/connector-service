import { Request, Response } from 'express';
import axios from 'axios';
import dbClient from '../config/database';
import { getUserById } from '../services/userService';
import { sendToBotService } from '../clients/bot.client';

export const handleWebhook = async (req: Request, res: Response) => {
  const client = dbClient;

  try {
    const { message } = req.body;
    if (!message || !message.from) {
      return res.status(400).json({ status: 'error', message: 'Invalid request format' });
    }

    const telegramUserId = message.from.id;

    await client.rpc('BEGIN');

    const user = await getUserById(telegramUserId);

    if (!user) {
      await client.rpc('ROLLBACK');
      return res.status(403).json({ status: 'error', message: 'User not authorized' });
    }

    const responseData = await sendToBotService('/webhook', req.body);

    await client.rpc('COMMIT');

    return res.status(200).json(responseData);
  } catch (error) {
    await client.rpc('ROLLBACK');
    console.error('Error in connector service:', error);

    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        status: 'error',
        message: error.response.data,
      });
    }

    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
