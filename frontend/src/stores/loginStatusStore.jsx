import { create } from 'zustand';

export const useLoginStatusStore = create((set) => ({
    loginStatus: false,
    login: () => set({ loginStatus: true }),
    logout: () => set({ loginStatus: false }),
  }));
