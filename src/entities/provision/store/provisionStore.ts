import { create } from 'zustand';
import type { Provision } from '../model/types';

interface ProvisionStore {
  barberId: number | null;
  provisions: Provision[];
  setBarberProvisions: (barberId: number, provisions: Provision[]) => void;
  updateProvision: (provision: Provision) => void;
  clearBarberProvisions: () => void;
}

export const useProvisionStore = create<ProvisionStore>((set) => ({
  barberId: null,
  provisions: [],
  setBarberProvisions: (barberId, provisions) =>
    set({ barberId, provisions }),
  updateProvision: (provision) =>
    set((state) => ({
      provisions: state.provisions.map((currentProvision) =>
        currentProvision.id === provision.id ? provision : currentProvision,
      ),
    })),
  clearBarberProvisions: () => set({ barberId: null, provisions: [] }),
}));
