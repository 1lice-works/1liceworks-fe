import { userService } from '@/entities/user/api/service';

export const userQueries = {
  getMyMinimalProfile: {
    queryKey: ['myMinimalProfile'],
    queryFn: async () => {
      const response = await userService.getMyMinimalProfile();
      return response.result;
    },
  },

  getMyProfile: {
    queryKey: ['myProfile'],
    queryFn: async () => {
      const response = await userService.getMyProfile();
      return response.result;
    },
  },
};
