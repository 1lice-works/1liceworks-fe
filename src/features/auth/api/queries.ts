import { authService } from './service';

export const authQueries = {
  signUp: {
    mutationFn: authService.signUp,
  },
  signIn: {
    mutationFn: authService.signIn,
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
};
