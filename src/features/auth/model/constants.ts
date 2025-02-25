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

// 회원가입 전체 스텝을 담은 배열
export const FUNNEL_STEP = {
  TEAM_INFO: '팀 정보 입력',
  PERSONAL_INFO: '개인 정보 입력',
  SIGN_INFO: '로그인 정보 입력',
  CHECK_INFO: '정보 확인',
} as const;

// 비밀번호 스텝 배열
export const FIND_PW = {
  PERSONAL_INFO: '개인 정보 입력',
  RESET_PW: '비밀번호 설정',
};

// progress bar 단계별 상태
export const PROGRESS_STEP = {
  noneStep: '',
};

// 산업 타입
export const INDUSTRY = [
  { value: 'CONSTRUCTION', item: '건설/건축' },
  { value: 'PUBLIC_SECTOR', item: '공공기관' },
  { value: 'FINANCE_INSURANCE', item: '금융/보험' },
  { value: 'MARKETING_AD_MEDIA', item: '마케팅/광고/미디어' },
  { value: 'LEISURE_TRAVEL', item: '레저/여행' },
  { value: 'RESEARCH_CONSULTING', item: '리서치/컨설팅' },
  { value: 'LAW', item: '법률' },
  { value: 'HEALTH_SOCIAL_WELFARE', item: '보건/사회복지' },
  { value: 'REAL_ESTATE', item: '부동산업' },
  { value: 'NON_PROFIT', item: '비영리기관' },
  { value: 'RENTAL_SERVICE', item: '운수 및 임대 서비스' },
  { value: 'RETAIL', item: '유통/도·소매' },
  { value: 'FOOD_CAFE', item: '음식/커피 전문점' },
  { value: 'MEDICAL_PHARMACEUTICAL', item: '의료/제약' },
  { value: 'IT_TELECOMMUNICATIONS', item: '정보통신/IT' },
  { value: 'MANUFACTURING', item: '제조' },
  { value: 'FASHION_BEAUTY', item: '패션/뷰티' },
  { value: 'EDUCATION', item: '학교 및 교육 서비스' },
  { value: 'OTHER', item: '기타' },
];

// 규모 타입
export const SCALE = [
  { value: 'ONE', item: '1' },
  { value: 'TWO_TO_NINE', item: '2~9' },
  { value: 'TEN_TO_NINETEEN', item: '10~19' },
  { value: 'TWENTY_TO_FORTY_NINE', item: '20~49' },
  { value: 'FIFTY_TO_NINETY_NINE', item: '50~99' },
  { value: 'HUNDRED_TO_TWO_NINETY_NINE', item: '100~299' },
  { value: 'THREE_HUNDRED_OR_MORE', item: '300명 이상' },
];
