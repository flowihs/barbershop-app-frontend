import type { TelegramUser } from '../../user/model/types';

export interface Category {
  id: number;
  name: string;
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
  user: TelegramUser;
  category: Category;
  slots: Slot[];
}
