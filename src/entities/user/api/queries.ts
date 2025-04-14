import { userService } from '@/entities/user/api/service';
import { createQueryKey } from '@/shared/api/queryKeys';

export const userQueries = {
  getMyMinimalProfile: {
    queryKey: () => createQueryKey('myMinimalProfile'),
    queryFn: async () => {
      const response = await userService.getMyMinimalProfile();
      return response.result;
    },
  },

  getMyProfile: {
    queryKey: () => createQueryKey('myProfile'),
    queryFn: async () => {
      const response = await userService.getMyProfile();
      return response.result;
    },
  },
};
