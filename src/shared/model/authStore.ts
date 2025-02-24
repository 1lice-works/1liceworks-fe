import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  setAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null, // 초기값을 null로 설정
      isAuthenticated: false,
      setAccessToken: (token) =>
        set({
          accessToken: token, // accessToken을 업데이트
        }),
      setAuth: () =>
        set({
          isAuthenticated: true,
        }),
    }),
    {
      name: 'auth-storage', // 로컬 스토리지의 키 이름 설정
    }
  )
);
