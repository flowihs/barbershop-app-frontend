
export interface TelegramProfile {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
  photoUrl?: string;
  description?: string;
  role: string;
}

export interface TelegramAuthResponse {
  user: TelegramProfile;
  token: string;
}
