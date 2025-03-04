import { Trash, Upload } from 'lucide-react';
import { useRef } from 'react';

import { InputWithLabel } from '@/shared/ui/custom/InputWithLabel';
import { UserAvatar } from '@/shared/ui/custom/UserAvatar';
import { Button } from '@/shared/ui/shadcn/Button';

export const ProfileEditContent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    // TODO) width 조정
    <form className='flex w-[300px] flex-col items-center gap-y-4'>
      <div className='flex flex-col items-center gap-y-2'>
        {/* default value - profileImage */}
        <UserAvatar size='xxl' />

        <div className='flex gap-x-2'>
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='rounded-full'
            onClick={handleUploadClick}
          >
            <Upload />
          </Button>
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='rounded-full'
          >
            <Trash />
          </Button>
        </div>
        <input
          type='file'
          id='profileImage'
          className='hidden'
          accept='image/*'
          ref={fileInputRef}
        />
      </div>

      {/* default value - username */}
      <InputWithLabel
        inputProps={{
          placeholder: '양혜림',
          id: 'username',
        }}
        labelProps={{ children: '이름', htmlFor: 'username' }}
      />

      {/* default value - responsibility */}
      <InputWithLabel
        inputProps={{
          placeholder: '프론트엔드 개발',
          id: 'responsibility',
        }}
        labelProps={{ children: '담당업무', htmlFor: 'responsibility' }}
      />

      {/* default value - phone */}
      <InputWithLabel
        inputProps={{
          placeholder: '01012345678',
          id: 'phone',
        }}
        labelProps={{ children: '휴대폰 번호', htmlFor: 'phone' }}
      />
    </form>
  );
};
