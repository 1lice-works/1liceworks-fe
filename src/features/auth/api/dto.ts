export interface SignUpDTO {
  data: {
    teamInfo: {
      companyName: string;
      teamName: string;
      industry: string;
      scale: string;
      hasPrivateDomain: boolean;
      domainName: string;
    };
    userInfo: {
      username: string;
      privateEmail: string;
      accountId: string;
      password: string;
    };
  };
}

export interface SignInDTO {
  accountId: string;
  password: string;
}
export interface SignInResponseDTO {
  accessToken: string;
  isSuccess: boolean;
}

export interface PostCheckVerifyDTO {
  email: string;
  verificationCode: string;
}
export interface checkVerifyResponseDTO {
  isuccess: boolean;
  code: number;
  message: string;
  result: boolean;
}

export interface postValidateEmailDTO {
  accountId: string;
}
