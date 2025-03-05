import { useQuery } from '@tanstack/react-query';

import { UserProfileDTO } from '@/features/auth/api/dto';
import { authQueries } from '@/features/auth/api/queries';
import { UserAvatar } from '@/shared/ui/custom/UserAvatar';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shared/ui/shadcn/Table';

type ProfileFieldItem = {
  key: keyof UserProfileDTO;
  label: string;
};

export const ProfileViewContent = () => {
  const { data: Profile } = useQuery<UserProfileDTO>({
    ...authQueries.getMyProfile,
  });

  const profileFields: ProfileFieldItem[] = [
    { key: 'position', label: '직책' },
    { key: 'jobTitle', label: '직급' },
    { key: 'userType', label: '사용자 유형' },
    { key: 'responsibility', label: '담당 업무' },
    { key: 'employeeNumber', label: '사원번호' },
    { key: 'hireDate', label: '입사일' },
    { key: 'privateEmail', label: '개인 이메일' },
    { key: 'phone', label: '휴대폰 번호' },
  ];

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex items-center gap-x-4'>
        <UserAvatar size='xl' avatarUrl={Profile?.profileImage} />
        <div className='flex flex-col'>
          <p className='text-lg font-semibold'>{Profile?.username}</p>
          <p className='text-muted-foreground text-sm'>{Profile?.accountId}</p>
        </div>
      </div>

      <Table className='border-y'>
        <TableBody>
          {profileFields.map(({ key, label }) => (
            <TableRow key={key}>
              <TableCell className='font-medium'>{label}</TableCell>
              <TableCell className='text-left'>
                {Profile?.[key] || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
