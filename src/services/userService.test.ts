import { getUserById } from './userService';
import supabase from '../config/database';

jest.mock('../config/database', () => ({
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(),
      })),
    })),
  })),
}));

describe('UserService', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user when user exists', async () => {
      const mockUser = { id: 1, telegram_id: '1', username: 'testuser', email: 'test@example.com' };
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockUser, error: null }),
          }),
        }),
      } as any);

      const result = await getUserById('1');
      expect(result).toEqual(mockUser);
    });

    it('should return null when user does not exist', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      } as any);

      const result = await getUserById('999');
      expect(result).toBeNull();
    });
  });
});
