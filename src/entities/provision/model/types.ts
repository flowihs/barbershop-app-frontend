import type { TelegramProfile } from '../../account';

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Slot {
  id: number;
  time: string;
  isBooking: boolean;
}

export interface CreateProvisionSlotRequest {
  provisionId: number;
  startTime: string;
  endTime: string;
}

export interface Provision {
  id: number;
  title: string;
  description: string;
  rating: number;
  user: TelegramProfile;
  avatar: string
  provisionCategory: Category;
  likesCount: number;
  likedByMe: boolean;
}

export interface CreateProvisionRequest {
  title: string;
  description: string;
  categoryId: number;
  slots: CreateProvisionSlotRequest[];
}


