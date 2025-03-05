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
}

export interface PostCheckVerifyDTO {
  email: string;
  verificationCode: string;
}

export interface PostResponseDTO {
  isuccess: boolean;
  code: number;
  message: string;
  result?: boolean;
}

export interface checkVerifyResponseDTO extends PostResponseDTO {
  result: boolean;
}

export interface postValidateEmailDTO {
  accountId: string;
}

export interface MinimalUserProfileDTO {
  userId: number;
  username: string;
  role: 'LEADER' | 'MEMBER';
  profileImage: string | null;
}

export interface UserProfileDTO extends Omit<MinimalUserProfileDTO, 'role'> {
  accountId: string;
  phone: string;
  privateEmail: string | null;
  userType: string;
  position: string;
  jobTitle: string;
  responsibility: string | null;
  employeeNumber: string | null;
  hireDate: string;
}
