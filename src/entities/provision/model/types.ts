import type { UserProfile } from '../../account';


export interface Category {
  id: number;
  name: string;
  description: string;
  image?: string
}

export interface ProvisionSlot {
  id: number;
  provisionId: number;
  startTime: string;
  endTime: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProvisionRequest {
  id: number;
  title: string;
  description: string;
  rating: number;
  user: UserProfile;
  provisionSlot: ProvisionSlot[];
  avatar: string;
  provisionCategory: Category;
  likesCount: number;
  likedByMe: boolean;
}

export interface Provision {
  id: number;
  title: string;
  description: string;
  rating: number;
  avatar: string;
  user: UserProfile
}

export interface CreateProvisionRequest {
  title: string;
  description: string;
  categoryId: number;
  slots: ProvisionSlot[];
}


