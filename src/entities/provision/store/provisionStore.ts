import { create } from 'zustand';
import type { ProvisionResponse } from '../model/types';

interface ProvisionStore {
  provisions: ProvisionResponse[];
  setBarberProvisions: (provisions: ProvisionResponse[]) => void;
  updateProvision: (provision: ProvisionResponse) => void;
  clearBarberProvisions: () => void;
}

export const useProvisionStore = create<ProvisionStore>((set) => ({
  provisions: [],
  setBarberProvisions: (provisions) =>
    set({ provisions }),
  updateProvision: (provision) =>
    set((state) => ({
      provisions: state.provisions.map((currentProvision) =>
        currentProvision.id === provision.id ? provision : currentProvision,
      ),
    })),
  clearBarberProvisions: () => set({ provisions: [] }),
}));
