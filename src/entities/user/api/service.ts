import { MinimalUserProfileDTO, UserProfileDTO } from '@/entities/user/api/dto';
import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/types/apiResponse';

export const userService = {
  getMyMinimalProfile: async (): Promise<
    ApiResponse<MinimalUserProfileDTO>
  > => {
    const response = await apiClient.get<MinimalUserProfileDTO>({
      url: '/auth/my-minimal-profile',
    });
    return response;
  },

  getMyProfile: async (): Promise<ApiResponse<UserProfileDTO>> => {
    const response = await apiClient.get<UserProfileDTO>({
      url: '/auth/my-profile',
    });
    return response;
  },
};
