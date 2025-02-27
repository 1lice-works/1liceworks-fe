import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/shadcn/Button';

import { AUTH_FORM_STYLES } from '../model/constants';
import { RHFInput } from './RHFInput';

interface StepFPWInfoProps {
  nextStep: (data: any) => void;
}
export const StepFPWInfo = ({ nextStep }: StepFPWInfoProps) => {
  const { getValues, formState } = useFormContext();
  const stepFields = ['accountId', 'private_email', 'verificate'];

  // const { mutate: isValidEmail } = useMutation({
  //   ...authQueries.validEmail,
  //   onSuccess: () => {
  //     // 여기 56번 브랜치에서 수정한 api
  //   },
  // });
  // const { mutate: isVerifyEmail } = useMutation({
  //   ...authQueries.verifyEmail,
  //   onSuccess: () => {},
  //   onError: () => {},
  // });
  // const { mutate: isCheckVerify } = useMutation({
  //   ...authQueries.checkVerify,
  //   onSuccess: () => {},
  //   onError: () => {},
  // });

  // 해당 스텝의 필드만 검사
  const isCurrentStepValid = stepFields.every((field) => {
    const value = getValues(field);
    console.log(field, value);
    return value !== null && value !== undefined && !formState.errors[field];
  });

  const handleNext = () => {
    if (!isCurrentStepValid) {
      console.log('현재 단계의 필수 입력값이 누락되었습니다.');
      return;
    }

    const formData = getValues(); // 현재 입력된 폼 데이터를 가져옴
    nextStep(formData); // 다음 스텝으로 이동할 때 데이터 전달
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
            rightElement={<Button type='button'>확인</Button>}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className={AUTH_FORM_STYLES.inputAndButton}>
            <RHFInput
              name='private_email'
              type='text'
              label='개인 이메일 주소'
              placeholder='이메일을 입력해주세요.'
              rightElement={
                <Button type='button' onClick={() => {}}>
                  인증
                </Button>
              }
            />
          </div>
          <div className={AUTH_FORM_STYLES.inputAndButton}>
            <RHFInput
              name='verificate'
              type='text'
              placeholder='인증번호를 입력해주세요.'
            ></RHFInput>
            <Button type='button' onClick={() => {}}>
              확인
            </Button>
          </div>
        </div>
      </div>
      <div className={AUTH_FORM_STYLES.submit}>
        <Button
          type='button'
          onClick={handleNext}
          disabled={!isCurrentStepValid}
        >
          다음
        </Button>
        <div className={AUTH_FORM_STYLES.already}>
          <span>
            <Link to={ROUTES.AUTH.SIGN_IN}>로그인</Link>
          </span>
          <span>
            <Link to={ROUTES.AUTH.SIGN_UP}>회원가입</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
