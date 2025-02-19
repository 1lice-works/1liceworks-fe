export interface InputTypes {
  type: string;
}

export interface StepsProps {
  title: string;
  status: 'active' | 'clear' | 'unActive';
}

export interface SignUpFormTypes {
  // 회사, 팀 정보 입력단계
  companyName: string;
  teamName: string;
  industry: string;
  size: string;
  // 개인정보 입력단계
  name: string;
  email: string;
  verificatedNumber: number;
  // 로그인 정보 입력단계
  userId: string;
  password: string;
}
