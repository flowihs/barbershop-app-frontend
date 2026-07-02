import type { TelegramProfile } from '../../account';

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
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
  price: number;
  image: string;
  user: TelegramProfile;
  category: Category;
  slots: Slot[];
}
