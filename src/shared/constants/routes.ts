export const ROUTES = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    CALLBACK: '/auth/callback',
  },
  TEAM: {
    root: '/team',
    // 하위에 추가
  },
  NOT_FOUND: '*',
} as const;
