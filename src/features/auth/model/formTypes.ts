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
  scale: string;
  hasPrivateDomain: boolean;
  domainName: string;
  // 개인정보 입력단계
  username: string;
  privateEmail: string;
  verificatedNumber: string;
  isAgree: boolean;
  // 로그인 정보 입력단계
  accountId: string;
  password: string;
  confirmPassword: string;
}

export interface FPWStep1Form {
  accountId: string;
  private_email: string;
  verificate: string;
}
export interface FPWStep2Form {
  newPassword: string;
}

export interface FindPWFormTypes {
  accountId: string;
  private_email: string;
  verificate: string;
  // newPassword: string;
}
