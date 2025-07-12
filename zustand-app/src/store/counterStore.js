import { create } from 'zustand';

export const useCounterStore = create(set => ({
  count: 0,
  increment: () => set({ count: state.count + 1 }),
  decrement: () => set({ count: state.count - 1 }),
  reset: () => set({ count: 0 }),
}));

export default useCounterStore;