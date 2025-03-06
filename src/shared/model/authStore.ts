import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: { accessToken: string }) => void;
  setAuth: () => void;
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
      signOut: () => {
        // 상태 초기화
        set({
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지의 키 이름 설정
    }
  )
);
