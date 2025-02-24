import { apiClient } from '@/shared/api/apiClient';
import { useAuthStore } from '@/shared/model/authStore';

import {
  checkVerifyResponseDTO,
  PostCheckVerifyDTO,
  postValidateEmailDTO,
  SignInDTO,
  SignInResponseDTO,
  SignUpDTO,
} from './dto';

export const authService = {
  signUp: async ({ data }: SignUpDTO) => {
    await apiClient.post({ url: '/auth/signup', data });
  },

  signIn: async ({ accountId, password }: SignInDTO) => {
    const response = await apiClient.post<SignInResponseDTO>({
      url: 'auth/login',
      data: {
        accountId,
        password,
      },
    });

    const token = response.data.accessToken;
    useAuthStore.getState().setAccessToken(token);
    useAuthStore.getState().setAuth();

    return response.data;
  },

  postVerifyEmail: async (email: { email: string }) => {
    await apiClient.post({
      url: 'auth/verify-email',
      data: email,
    });
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
    const response = await apiClient.post<checkVerifyResponseDTO>({
      url: 'auth/validate-email',
      data: {
        accountId,
      },
    });
    return response.data;
  },
};
