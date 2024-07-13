import { create } from 'zustand';

export const useDisplayModeStore = create((set) => ({
    displayMode: 'Map',
    changeMode: (newmode) => set((state) => ({ displayMode: newmode}))
  }));
