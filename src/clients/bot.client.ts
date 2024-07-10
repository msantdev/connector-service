import axios from 'axios';
import { TelegramMessage } from '../types';



export const sendToBotService = async (endpoint: string, data: TelegramMessage) => {
  try {
    const response = await axios.post(`${process.env.BOT_SERVICE_URL}${endpoint}`, data, {
      headers: {
        'X-API-Key': process.env.BOT_SERVICE_API_KEY as string,
      },
    });
    return response.data;
  } catch (error) {
      throw new Error(`Unexpected error: ${error}`);
  }
};
