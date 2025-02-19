export interface InputTypes {
  type: string;
}

export interface StepsProps {
  title: string;
  status: 'active' | 'clear' | 'unActive';
}

export interface SignUpFormTypes {
  companyName: string;
  teamName: string;
  industry: string;
  size: number;
  email: string;
  verificatedNumber: number;
}
