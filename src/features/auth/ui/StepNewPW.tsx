import { RHFInput } from '@/shared/ui/custom/RHFInput';
import { Button } from '@/shared/ui/shadcn/Button';

import { AUTH_FORM_STYLES } from '../model/constants';

interface StepNewPWProps {
  prevStep: () => void;
}

export const StepNewPW = ({ prevStep }: StepNewPWProps) => {
  return (
    <div className={AUTH_FORM_STYLES.form}>
      <div className={AUTH_FORM_STYLES.title}>
        새로운 비밀번호를 설정해주세요.
      </div>
      <div className={AUTH_FORM_STYLES.inputLayer}>
        <div className='flex flex-col gap-2'>
          <div className={AUTH_FORM_STYLES.inputAndButton}>
            <RHFInput
              label='변경할 비밀번호'
              name='newPassword'
              type='password'
              placeholder='비밀번호를 입력해주세요.'
            />
          </div>
          <RHFInput
            name='confirmPassword'
            type='password'
            placeholder='비밀번호를 다시 입력해주세요.'
          />
          <div className='px-2'>
            <ul className='text-muted-foreground list-disc text-xs'>
              <li className='ml-[12px]'>
                비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합해 만들어주세요.
              </li>
              <li className='ml-[12px]'>
                비밀번호에는 3자 이상 반복 또는 연속되는 문자를 사용할 수
                없습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex w-full gap-2'>
        <Button
          onClick={prevStep}
          variant='outline'
          type='button'
          className='w-[40%]'
        >
          이전
        </Button>
        <Button className='w-full'>완료</Button>
      </div>
    </div>
  );
};
