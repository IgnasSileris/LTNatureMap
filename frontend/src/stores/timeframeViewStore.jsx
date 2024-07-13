import { create } from 'zustand';

export const useTimeframeViewStore = create(set => ({
    timeframeView: 'Max',
    setTimeframeView: (newTimeframeView) => set({ timeframeView: newTimeframeView })
}));

