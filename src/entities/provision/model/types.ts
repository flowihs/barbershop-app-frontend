import type { TelegramProfile } from '../../account';

export interface Category {
  id: number;
  name: string;
  description: string;
  image?: string
}

// export interface Slot {
//   id: number;
//   time: string;
//   isBooking: boolean;
// }

export interface ProvisionSlot {
  provisionId: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Provision {
  id: number;
  title: string;
  description: string;
  rating: number;
  user: TelegramProfile;
  slots: ProvisionSlot[]
  avatar: string
  provisionCategory: Category;
  likesCount: number;
  likedByMe: boolean;
}

export interface CreateProvisionRequest {
  title: string;
  description: string;
  categoryId: number;
  slots: ProvisionSlot[];
}


