import { UserAvatar } from '@/shared/ui/custom/UserAvatar';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shared/ui/shadcn/Table';

export const ProfileViewContent = () => {
  const profileData = [
    // TODO) value에 API 응답값 넣기
    { label: '직책', value: '부장' },
    { label: '직급', value: '관리직' },
    { label: '사용자 유형', value: '정규직' },
    { label: '담당 업무', value: '프론트엔드 개발' },
    { label: '사원번호', value: '4' },
    { label: '입사일', value: '2025.02.07.' },
    { label: '개인 이메일', value: 'lovelimi1113@gmail.com' },
    { label: '휴대폰 번호', value: '' },
  ];

  return (
    // TODO) width 조정
    <div className='flex w-[300px] flex-col gap-y-6'>
      <div className='flex items-center gap-x-4'>
        {/* TODO) src에 profileImage 넣기 */}
        <UserAvatar size='xl' />
        <div className='flex flex-col gap-y-1'>
          {/* TODO) username 넣기 */}
          <p className='text-lg font-semibold'>양혜림</p>
          {/* TODO) privateEmail 넣기 */}
          <p className='text-muted-foreground text-sm'>
            hyerim@threadly.ilice-works.com
          </p>
        </div>
      </div>

      <Table className='border-y'>
        <TableBody>
          {profileData.map(({ label, value }) => [
            <TableRow key={label}>
              <TableCell className='font-medium'>{label}</TableCell>
              <TableCell className='text-left'>{value}</TableCell>
            </TableRow>,
          ])}
        </TableBody>
      </Table>
    </div>
  );
};
