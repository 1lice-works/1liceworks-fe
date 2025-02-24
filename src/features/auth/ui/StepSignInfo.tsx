import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/shadcn/Button';

import { AUTH_FORM_STYLES } from '../model/constants';
import { RHFInput } from './RHFInput';

interface StepSignInfoProps {
  nextStep: (data: any) => void; // 수정: 데이터를 받을 수 있도록 함
  prevStep: () => void;
}

export const StepSignInfo = ({ nextStep, prevStep }: StepSignInfoProps) => {
  const handleCheckMail = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };
  const { getValues, formState } = useFormContext();

  // 해당 스텝에서 유효성을 검사할 필드 목록
  const stepFields = ['accountId', 'password'];

  // 해당 스텝의 필드만 검사
  const isCurrentStepValid = stepFields.every(
    (field) => !formState.errors[field]
  );

  const handleNext = () => {
    if (!isCurrentStepValid) {
      console.log('현재 단계의 필수 입력값이 누락되었습니다.');
      return;
    }

    const formData = getValues(); // 현재 입력된 폼 데이터를 가져옴
    nextStep(formData); // 다음 스텝으로 이동할 때 데이터 전달
  };

  return (
    <>
      <div className={AUTH_FORM_STYLES.title}>
        로그인에 사용할 계정 정보를 입력해주세요.
      </div>
      <div className={AUTH_FORM_STYLES.form}>
        <div className={AUTH_FORM_STYLES.inputLayer}>
          <div>
            <div className={AUTH_FORM_STYLES.inputAndButton}>
              <RHFInput
                name='accountId'
                type='email'
                label='아이디'
                placeholder='ID@mydomain.1lice-work.com'
              />
              <Button onClick={(e) => handleCheckMail(e)}>중복 확인</Button>
            </div>
            <p className='text-muted-foreground pt-1 text-xs'>
              ID는 'ID@mydomain.ilice-works.com' 형식으로, 로그인 시 사용됩니다.
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <RHFInput
              label='비밀번호'
              name='password'
              type='password'
              placeholder='비밀번호를 입력해주세요.'
            />
            <RHFInput
              name='confirmPassword'
              type='password'
              placeholder='비밀번호를 다시한번 입력해주세요.'
            />
            <div className='px-2'>
              <ul className='text-muted-foreground list-disc text-xs'>
                <li className='ml-[12px]'>
                  비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합해
                  만들어주세요.
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
          <Button className='w-[50%]' variant='outline' onClick={prevStep}>
            이전
          </Button>
          <Button
            className='w-full'
            onClick={handleNext}
            disabled={!isCurrentStepValid}
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
};
