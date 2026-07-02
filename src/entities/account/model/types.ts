export interface TelegramProfile {
  id: number;
  firstName: string;
  username: string | null;
  description: string | null;
  role: string;
  email: string | null; 
  createdAt: string;
  updatedAt: string;
}
