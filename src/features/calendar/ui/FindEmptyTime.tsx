import { Button } from '@/shared/ui/shadcn/Button';
interface FindEmptyTimeProps {
  calendarType: number;
}

export const FindEmptyTime = ({ calendarType }: FindEmptyTimeProps) => {
  return (
    <div className='flex h-full w-full max-w-[340px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-[#CBD5E1] bg-[#F9FBFD]'>
      {calendarType === 1 && (
        <>
          <p className='text-muted-foreground text-xs'>
            회의 시간과 참석자를 선택하셨나요?
            <br />
            모두가 가능한 회의 시간을 찾아보세요.
          </p>
          <Button>빈 시간 찾기</Button>
        </>
      )}
    </div>
  );
};
