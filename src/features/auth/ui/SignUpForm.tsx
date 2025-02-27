// import { useFunnel } from '@use-funnel/react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { Form } from '@/shared/ui/shadcn/Form';

import { authQueries } from '../api/queries';
import { FUNNEL_STEP } from '../model/constants';
import { SignUpFormTypes } from '../model/formTypes';
import { signUpSchema } from '../model/schema';
import { useFunnel } from '../model/useFunnel';
import { ProgressBar } from './ProgressBar';
import { StepCheckInfo } from './StepCheckInfo';
import { StepPersonalInfo } from './StepPersonalInfo';
import { StepSignInfo } from './StepSignInfo';
import { StepTeamInfo } from './StepTeamInfo';

const steps = [
  '팀 정보 입력',
  '개인 정보 입력',
  '로그인 정보 입력',
  '정보 확인',
];
export const SignUpForm = () => {
  const navigate = useNavigate();
  const { step, currentStepIndex, nextStep, prevStep } = useFunnel({ steps });
  const form = useForm<SignUpFormTypes>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      hasPrivateDomain: false,
      domainName: '',
    },
  });
  const [formData, setFormData] = useState<SignUpFormTypes>({
    companyName: '',
    teamName: '',
    industry: '',
    scale: '',
    hasPrivateDomain: false,
    domainName: '',
    username: '',
    privateEmail: '',
    verificatedNumber: '',
    isAgree: false,
    accountId: '',
    password: '',
    confirmPassword: '',
  });

  const handleNextStep = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data })); // 기존 데이터 유지하면서 업데이트
    nextStep(); // 다음 스텝 이동
  };
  const { mutate, isPending } = useMutation({
    ...authQueries.signUp,
    onSuccess: () => {
      navigate(ROUTES.AUTH.SIGN_IN);
    },
    onError: (error) => {
      alert(error.message);
      return;
    },
  });

  useEffect(() => {
    console.log('Updated FormData:', formData);
  }, [formData]);

  const onSubmit = () => {
    const requestData = {
      data: {
        teamInfo: {
          companyName: formData.companyName,
          teamName: formData.teamName,
          industry: formData.industry,
          scale: formData.scale,
          hasPrivateDomain: formData.hasPrivateDomain,
          domainName: formData.hasPrivateDomain
            ? formData.domainName
            : '1lice-works', // 미보유 시 빈 문자열
        },
        userInfo: {
          username: formData.username,
          privateEmail: formData.privateEmail,
          accountId: formData.accountId,
          password: formData.password,
        },
      },
    };
    console.log(requestData);
    mutate(requestData);
  };

  return (
    <div className='text-foreground flex w-full flex-col items-center justify-center'>
      <ProgressBar steps={steps} currentStep={currentStepIndex} />
      <Form {...form}>
        <form
          className='flex flex-col items-center'
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
          }}
        >
          {step === FUNNEL_STEP.TEAM_INFO && (
            <StepTeamInfo nextStep={handleNextStep} />
          )}
          {step === FUNNEL_STEP.PERSONAL_INFO && (
            <StepPersonalInfo nextStep={handleNextStep} prevStep={prevStep} />
          )}
          {step === FUNNEL_STEP.SIGN_INFO && (
            <StepSignInfo nextStep={handleNextStep} prevStep={prevStep} />
          )}
          {step === FUNNEL_STEP.CHECK_INFO && (
            <StepCheckInfo
              prevStep={prevStep}
              formData={formData}
              isPending={isPending}
            />
          )}
        </form>
      </Form>
    </div>
  );
};
