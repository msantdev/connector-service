import { UserRepository } from '../repositories/userRepository';
import { User } from '../types';

const userRepository: UserRepository = new UserRepository();

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    return await userRepository.getUserByTelegramId(userId);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};