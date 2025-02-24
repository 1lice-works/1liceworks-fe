import { apiClient } from '@/shared/api/apiClient';

import { SignUpDTO } from './dto';

export const authService = {
  signUp: async ({ data }: SignUpDTO) => {
    await apiClient.post({ url: '/auth/signup', data });
  },
};
