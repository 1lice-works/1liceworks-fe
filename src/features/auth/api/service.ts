import { apiClient } from '@/shared/api/apiClient';
import { useAuthStore } from '@/shared/model/authStore';
import { ApiResponse } from '@/shared/types/apiResponse';

import {
  MinimalUserProfileDTO,
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
      url: '/auth/login',
      data: {
        accountId,
        password,
      },
    });

    const token = response.data;

    if (token) {
      //@ts-expect-error expected behavior
      useAuthStore.getState().setAccessToken(token); // 토큰을 상태에 저장
      useAuthStore.getState().setAuth(); // 인증 상태를 true로 설정
    } else {
      throw new Error('로그인 실패: 토큰을 받지 못했습니다.');
    }
  },

  signOut: async (): Promise<void> => {
    try {
      await apiClient.post<void>({
        url: '/auth/logout',
      });
    } catch (error) {
      console.error('로그아웃 API 호출 오류:', error);
      throw error; // 에러를 다시 throw하여 컴포넌트의 onError에서 처리할 수 있게 함
    } finally {
      useAuthStore.getState().signOut();
    }
  },

  postVerifyEmail: async (email: { email: string }) => {
    const response = await apiClient.post<PostResponseDTO>({
      url: '/auth/verify-email',
      data: email,
    });
    return response.result;
  },

  postCheckVerify: async ({ email, verificationCode }: PostCheckVerifyDTO) => {
    await apiClient.post({
      url: '/auth/verify',
      data: {
        email,
        verificationCode,
      },
    });
  },

  postValidateEmail: async ({ accountId }: postValidateEmailDTO) => {
    const response = await apiClient.post<PostResponseDTO>({
      url: '/auth/validate-email',
      data: {
        accountId,
      },
    });
    return response;
  },

  getMyMinimalProfile: async (): Promise<
    ApiResponse<MinimalUserProfileDTO>
  > => {
    const response = await apiClient.get<MinimalUserProfileDTO>({
      url: '/auth/my-minimal-profile',
    });

    return response;
  },
};
