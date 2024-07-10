import { Request } from 'express';

export interface User {
  id: number;
  telegram_id: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}

export interface TelegramMessage {
  message: {
    text: string;
    chat: {
      id: number;
    };
    from: {
      id: string;
    };
  };
};


  
  