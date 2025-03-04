import { authService } from './service';

export const authQueries = {
  signUp: {
    mutationFn: authService.signUp,
  },
  signIn: {
    mutationFn: authService.signIn,
  },
  signOut: {
    mutationFn: authService.signOut,
  },

  verifyEmail: {
    mutationFn: authService.postVerifyEmail,
  },
  checkVerify: {
    mutationFn: authService.postCheckVerify,
  },
  validEmail: {
    mutationFn: authService.postValidateEmail,
  },

  getMyMinimalProfile: {
    queryKey: ['myMinimalProfile'],
    queryFn: async () => {
      const response = await authService.getMyMinimalProfile();
      return response.result;
    },
  },
};
