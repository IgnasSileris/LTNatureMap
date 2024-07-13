import { create } from 'zustand';

export const useLocationStateStore = create(set => ({
    locationState: null,
    setLocationState: (newLocationState) => set({ locationState: newLocationState })
}));