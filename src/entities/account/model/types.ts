
type Role = 'BARBER' | 'CLEINT' | 'ADMIN';

export interface TelegramAuthResponse {
  user: UserProfile;
  token: string;
}

export interface UserProfile {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  photoUrl: string,
  description: string,
  tiktok: string,
  instagram: string,
  number: string
  role: Role,
}
