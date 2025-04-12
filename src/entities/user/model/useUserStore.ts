import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: number | null;
  setUserId: (userId: number) => void;
  resetUserId: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId: number) => set({ userId }),
      resetUserId: () => set({ userId: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
