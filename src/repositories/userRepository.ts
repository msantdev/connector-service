import { User } from '../types';
import supabase from '../config/database';

export class UserRepository {
  async getUserByTelegramId(telegramId: string): Promise<User | null> {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', telegramId)
        .single();

      if (error) {
        throw error;
      }

      return users || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null
    }
  }
}
