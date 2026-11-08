import type { UserProfile } from '../../account';


export interface Category {
  id: number;
  name: string;
  description: string;
  image?: string
}

export interface ProvisionSlots {
  id: number;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface ProvisionResponse {
  id: number;
  title: string;
  description: string;
  rating: number;
  user: UserProfile;
  provisionSlots: ProvisionSlots[];
  avatar: string;
  images: string[];
  provisionCategory: Category;
  likesCount: number;
  likedByMe: boolean;
}

export interface CreateProvisionSlotRequest {
  provisionId: number;
  startTime: string;
  endTime: string;
}

export interface CreateProvisionRequest {
  title: string;
  description: string;
  avatar: File;
  images: File[];
  categoryId: number;
  slots: CreateProvisionSlotRequest[];
}


