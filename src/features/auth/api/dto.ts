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
