// 요청에 인증 헤더를 필요로 하지 않는 API (/api는 생략)
export const NON_AUTH_PATHS = [
  '/auth/verify',
  '/auth/signup',
  '/auth/login',
  '/auth/refresh-token',
  '/auth/verify-email',
  '/auth/verify-email-password',
  '/auth/validate-email',
  '/auth/change-password/by-email',
];
