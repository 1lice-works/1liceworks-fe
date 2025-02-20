import { useState } from 'react';

import { Button } from '@/shared/ui/shadcn/Button';

export const FindEmptyTime = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  return (
    <div className='flex h-full w-full max-w-[340px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-[#CBD5E1] bg-[#F9FBFD]'>
      <p className='text-muted-foreground text-xs'>
        회의 시간과 참석자를 선택하셨나요?
        <br />
        모두가 가능한 회의 시간을 찾아보세요.
      </p>
      <Button>빈 시간 찾기</Button>
    </div>
  );
};
