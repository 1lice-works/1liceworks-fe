import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { RHFCheckBox } from '@/shared/ui/custom/RHFCheckBox';
import { Button } from '@/shared/ui/shadcn/Button';

import { authQueries } from '../api/queries';
import { AUTH_FORM_STYLES } from '../model/constants';
import { RHFInput } from './RHFInput';

interface StepPersonalInfoProps {
  nextStep: (data: any) => void; // 수정: 데이터를 받을 수 있도록 함
  prevStep: () => void;
}

export const StepPersonalInfo = ({
  nextStep,
  prevStep,
}: StepPersonalInfoProps) => {
  const { getValues, formState, setError, clearErrors } = useFormContext(); // 폼 데이터 가져오기
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // 해당 스텝에서 유효성을 검사할 필드 목록
  const stepFields = [
    'username',
    'privateEmail',
    'verificatedNumber',
    'isAgree',
  ];
  const isAgreeAll = getValues('isAgree');

  // 이메일 인증
  const { mutate: verifyEmail, isPending } = useMutation({
    ...authQueries.verifyEmail,
    onSuccess: () => {
      setIsEmailSent(true);

      console.log('인증번호가 이메일로 발송되었습니다.');
    },
    onError: (error: Error) => {
      setIsEmailSent(false);
      setError('privateEmail', {
        type: 'manual',
        message: error.message, // 서버에서 온 메시지 표시
      });
    },
  });

  // 인증번호 확인
  const { mutate: checkVerify } = useMutation({
    ...authQueries.checkVerify,
    onSuccess: () => {
      setEmailVerified(true);
      clearErrors('verificatedNumber'); // 인증번호 오류 초기화
      // console.log('이메일 인증 성공!');
    },
    onError: (error) => {
      setEmailVerified(false);
      setError('verificatedNumber', {
        type: 'manual',
        message: error.message,
      });
    },
  });

  // 이메일 인증코드 요청
  const handleSendMail = () => {
    const email = getValues('privateEmail');
    if (!email) {
      setError('privateEmail', {
        type: 'manual',
        message: '이메일을 입력하세요.',
      });
      return;
    }
    verifyEmail({ email: email });
  };
  const handleVerifyNum = () => {
    const email = getValues('privateEmail'); // 이메일 가져오기
    const verificatedNumber = getValues('verificatedNumber'); // 인증번호 가져오기
    checkVerify({ email, verificationCode: verificatedNumber }); // 이메일과 인증번호 함께 전달
  };

  // 해당 스텝의 필드만 검사
  const isCurrentStepValid = stepFields.every(
    (field) => !formState.errors[field] && isAgreeAll
  );

  // 다음 step
  const handleNext = () => {
    if (!isCurrentStepValid) {
      console.log('현재 단계의 필수 입력값이 누락되었습니다.');
      return;
    }

    const formData = getValues(); // 현재 입력된 폼 데이터를 가져옴
    nextStep(formData); // 다음 스텝으로 이동할 때 데이터 전달
  };

  useEffect(() => {
    console.log(isAgreeAll);
  }, [isAgreeAll]);

  return (
    <>
      <div className={AUTH_FORM_STYLES.title}>
        가입에 필요한 개인 정보를 입력해 주세요.
        <br />
        개설을 완료하면 이 팀 계정의 최고 관리자가 됩니다.
      </div>
      <div className={AUTH_FORM_STYLES.form}>
        <div className={AUTH_FORM_STYLES.inputLayer}>
          <RHFInput
            label='이름'
            name='username'
            type='text'
            placeholder='이름을 입력해주세요.'
          />
          <div className='flex w-full flex-col gap-2'>
            <div className={AUTH_FORM_STYLES.inputAndButton}>
              <RHFInput
                label='개인 이메일 주소'
                name='privateEmail'
                placeholder='이메일을 입력해주세요.'
                rightElement={
                  <Button onClick={handleSendMail}>
                    {isPending ? '전송중' : isEmailSent ? '전송됨' : '전송'}
                  </Button>
                }
              />
            </div>
            <div className={AUTH_FORM_STYLES.inputAndButton}>
              <RHFInput
                name='verificatedNumber'
                placeholder='인증번호를 입력해주세요.'
                rightElement={
                  <Button type='button' onClick={handleVerifyNum}>
                    {emailVerified ? '확인됨' : '확인'}
                  </Button>
                }
              />
            </div>
          </div>
          <RHFCheckBox name='isAgree' label='전체 동의' />
        </div>
        <div className='flex w-full gap-2'>
          <Button
            type='button'
            className='w-[50%]'
            variant='outline'
            onClick={prevStep}
          >
            이전
          </Button>
          <Button
            className='w-full'
            type='button'
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
