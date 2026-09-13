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

export interface ProvisionRequest {
  id: number;
  title: string;
  description: string;
  rating: number;
  user: UserProfile;
  provisionSlots: ProvisionSlots[];
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
  user: UserProfile;
  provisionCategory?: Category;
}

export interface CreateProvisionRequest {
  title: string;
  description: string;
  categoryId: number;
  slots: ProvisionSlots[];
}


