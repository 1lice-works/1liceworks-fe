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
