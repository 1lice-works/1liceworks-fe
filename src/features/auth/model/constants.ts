export const AUTH_FORM_STYLES = {
  title: 'text-foreground text-xl font-bold text-center my-6', // form의 title
  form: 'flex flex-col items-center gap-6 w-[338px]', // form 전체 레이아웃
  inputLayer: 'flex flex-col gap-3 w-full', // 2개 이상의 input
  label: ' text-sm font-semibold mb-1', // input의 label
  inputAndButton: 'flex gap-2 w-full items-end', // input과 button이 동시에 있을때

  submit: 'w-full flex flex-col gap-2', // submit 영역
  already: 'text-muted-foreground flex justify-between', // submit 하위 text스타일

  checkBox: 'flex items-center gap-2',

  infoItem: 'flex w-full justify-between border-b-2 border-[#E2E8F0] p-4',

  errorMessage: 'mt-1 text-xs text-red-500',
} as const;

export interface StepInterface {
  step: '팀 정보 입력' | '개인 정보 입력' | '로그인 정보 입력' | '정보 확인';
}

// 전체 스텝을 담은 배열
export const FUNNEL_STEP = {
  TEAM_INFO: '팀 정보 입력',
  PERSONAL_INFO: '개인 정보 입력',
  SIGN_INFO: '로그인 정보 입력',
  CHECK_INFO: '정보 확인',
} as const;

// progress bar 단계별 상태
export const PROGRESS_STEP = {
  noneStep: '',
};
