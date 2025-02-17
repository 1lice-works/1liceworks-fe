export const ROUTES = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    CALLBACK: '/auth/callback',
    FIND_PW: `/findpassword`,
  },
  CALENDAR: {
    root: '/calendar',
  },
  TEAM: {
    root: '/team',
    // 하위에 추가
  },
  NOT_FOUND: '*',
} as const;
