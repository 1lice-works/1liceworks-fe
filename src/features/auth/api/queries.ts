import { authService } from './service';

export const authQueries = {
  signUp: {
    mutationFn: authService.signUp,
  },
};
