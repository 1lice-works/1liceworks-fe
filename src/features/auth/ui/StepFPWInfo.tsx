import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/shadcn/Button';

import { AUTH_FORM_STYLES } from '../model/constants';
import { FindPWFormTypes } from '../model/formTypes';
import { RHFInput } from './RHFInput';

interface StepFPWInfoProps {
  nextStep: () => void;
  setFormData: (data: FindPWFormTypes) => void; // formData 업데이트 함수 추가
}
export const StepFPWInfo = ({ nextStep, setFormData }: StepFPWInfoProps) => {
  const {
    handleSubmit,
    // watch,
    formState: { isValid },
  } = useFormContext();

  // 모든 필드가 입력되었는지 확인
  const handleNext = (data: any) => {
    setFormData(data); // formData 업데이트
    nextStep(); // 다음 단계로 이동
  };

  return (
    <div className={AUTH_FORM_STYLES.form}>
      <div className={AUTH_FORM_STYLES.title}>개인 정보를 입력해주세요.</div>
      <div className={AUTH_FORM_STYLES.inputLayer}>
        <div className={AUTH_FORM_STYLES.inputAndButton}>
          <RHFInput
            name='accountId'
            type='text'
            label='ID'
            placeholder='아이디를 입력해주세요.'
          />
          <Button>확인</Button>
        </div>
        <div className='flex flex-col gap-2'>
          <div className={AUTH_FORM_STYLES.inputAndButton}>
            <RHFInput
              name='private_email'
              type='text'
              label='개인 이메일 주소'
              placeholder='이메일을 입력해주세요.'
            />
            <Button onClick={() => {}}>인증</Button>
          </div>
          <div className={AUTH_FORM_STYLES.inputAndButton}>
            <RHFInput
              name='verificate'
              type='text'
              placeholder='인증번호를 입력해주세요.'
            ></RHFInput>
            <Button onClick={() => {}}>확인</Button>
          </div>
        </div>
      </div>
      <div className={AUTH_FORM_STYLES.submit}>
        <Button onClick={handleSubmit(handleNext)} disabled={!isValid}>
          다음
        </Button>
        <div className={AUTH_FORM_STYLES.already}>
          <span>로그인</span>
          <span>회원가입</span>
        </div>
      </div>
    </div>
  );
};
