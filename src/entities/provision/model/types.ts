import type { TelegramProfile } from '../../account';

export interface Category {
  id: number;
  name: string;
  descirption: string;
}

export interface Slot {
  id: number;
  time: string;
  isBooking: boolean;
}

export interface Provision {
  id: number;
  title: string;
  description: string;
  rating: number;
  user: TelegramProfile;
  category: Category;
  likesCount: number,
  likedByMe: boolean
}
