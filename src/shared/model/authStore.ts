import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: { accessToken: string }) => void;
  setAuth: () => void;
  reset: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null, // 초기값을 null로 설정
      isAuthenticated: false,
      setAccessToken: (token: { accessToken: string }) => {
        set({
          accessToken: token.accessToken,
        });
      },
      setAuth: () =>
        set({
          isAuthenticated: true,
        }),
      reset: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
        });
      },
      signOut: () => {
        useAuthStore.getState().reset();
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지의 키 이름 설정
    }
  )
);
