import mockData from './mocks/barbershop.json';
import type { TelegramAuthResponse, UserProfile } from '@/entities/account/model/types';
import type { Category, CreateProvisionRequest, ProvisionResponse } from '@/entities/provision/model/types';

const mockUser = structuredClone(mockData.user) as UserProfile;
const mockCategories = structuredClone(mockData.categories) as Category[];
let mockProvisions = structuredClone(mockData.provisions) as ProvisionResponse[];

export const mockApi = {
  auth(): TelegramAuthResponse {
    return { user: structuredClone(mockUser), token: 'mock-jwt-token' };
  },
  profile(id: number | undefined): UserProfile {
    if (id !== mockUser.id) throw new Error('Mock profile was not found');
    return structuredClone(mockUser);
  },
  updateProfile(changes: Partial<UserProfile>) {
    Object.assign(mockUser, changes);
    return structuredClone(mockUser);
  },
  categories: () => structuredClone(mockCategories),
  provisions: () => structuredClone(mockProvisions),
  provision(id: number) {
    const provision = mockProvisions.find((item) => item.id === id);
    if (!provision) throw new Error('Mock provision was not found');
    return structuredClone(provision);
  },
  topProvisions: () => structuredClone(mockProvisions.slice(0, 5)),
  toggleLike(id: number) {
    const provision = mockProvisions.find((item) => item.id === id);
    if (!provision) throw new Error('Mock provision was not found');
    provision.likedByMe = !provision.likedByMe;
    provision.likesCount += provision.likedByMe ? 1 : -1;
    return structuredClone(provision);
  },
  createProvision(request: CreateProvisionRequest) {
    const category = mockCategories.find((item) => item.id === request.categoryId) ?? mockCategories[0];
    const created: ProvisionResponse = {
      id: Math.max(...mockProvisions.map((item) => item.id)) + 1,
      title: request.title,
      description: request.description,
      rating: 0,
      avatar: URL.createObjectURL(request.avatar),
      images: request.images.map((file) => URL.createObjectURL(file)),
      likesCount: 0,
      likedByMe: false,
      provisionCategory: structuredClone(category),
      user: structuredClone(mockUser),
      provisionSlots: request.slots.map((slot, index) => ({ ...slot, id: 2000 + index, available: true })),
    };
    mockProvisions = [created, ...mockProvisions];
    return structuredClone(created);
  },
};

export const useApiMocks = import.meta.env.VITE_USE_API_MOCKS === 'true';
