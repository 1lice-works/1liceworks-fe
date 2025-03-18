export const ROUTES = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    FIND_PW: `/findpassword`,
  },
  CALENDAR: {
    root: '/calendar',
    NEW: '/calendar/new',
    DETAIL: {
      ROOT: '/:eventId',
      EVENT: (eventId: string) => `/${eventId}`,
    },
  },
  TEAM: {
    root: '/team',
    // 하위에 추가
  },
  NOT_FOUND: '*',
} as const;
