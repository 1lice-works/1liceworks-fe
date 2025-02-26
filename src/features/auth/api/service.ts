import { apiClient } from '@/shared/api/apiClient';
import { useAuthStore } from '@/shared/model/authStore';

import {
  PostCheckVerifyDTO,
  PostResponseDTO,
  postValidateEmailDTO,
  SignInDTO,
  SignInResponseDTO,
  SignUpDTO,
} from './dto';

export const authService = {
  signUp: async ({ data }: SignUpDTO) => {
    await apiClient.post({ url: '/auth/signup', data });
  },

  signIn: async ({ accountId, password }: SignInDTO): Promise<void> => {
    const response = await apiClient.signPost<SignInResponseDTO>({
      url: 'auth/login',
      data: {
        accountId,
        password,
      },
    });
    // if(response.data)

    console.log(response);
    const token = response.data;

    if (token) {
      useAuthStore.getState().setAccessToken(token); // 토큰을 상태에 저장
      useAuthStore.getState().setAuth(); // 인증 상태를 true로 설정
    } else {
      throw new Error('로그인 실패: 토큰을 받지 못했습니다.');
    }
  },
  signOut: async (): Promise<void> => {
    await apiClient.post<void>({ url: '/auth/logout' });
    localStorage.clear();
  },

  postVerifyEmail: async (email: { email: string }) => {
    const response = await apiClient.post<PostResponseDTO>({
      url: 'auth/verify-email',
      data: email,
    });
    return response.data;
  },

  postCheckVerify: async ({ email, verificationCode }: PostCheckVerifyDTO) => {
    await apiClient.post({
      url: 'auth/verify',
      data: {
        email,
        verificationCode,
      },
    });
  },

  postValidateEmail: async ({ accountId }: postValidateEmailDTO) => {
    const response = await apiClient.post<PostResponseDTO>({
      url: 'auth/validate-email',
      data: {
        accountId,
      },
    });
    return response.data;
  },
};
