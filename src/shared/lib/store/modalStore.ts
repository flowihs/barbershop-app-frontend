import { create } from 'zustand';

interface ModalStore {
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
}));
