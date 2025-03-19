import { Button } from '@/shared/ui/shadcn/Button';

export const FindEmptyTime = () => {
  return (
    <div className='bg-background-light flex h-full w-full max-w-80 min-w-fit flex-col items-center justify-center gap-4 rounded-lg border p-4'>
      <div className='text-muted-foreground text-center text-sm'>
        <p>회의 시간과 참석자를 선택하셨나요?</p>
        <p>모두가 가능한 회의 시간을 찾아보세요.</p>
      </div>
      <Button size='sm'>빈 시간 찾기</Button>
    </div>
  );
};
