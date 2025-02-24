// import { useFunnel } from '@use-funnel/react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const { step, currentStepIndex, nextStep, prevStep } = useFunnel({ steps });
  const form = useForm<SignUpFormTypes>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });
  const [formData, setFormData] = useState({
    companyName: '',
    teamName: '',
    industry: '',
    scale: '',
    hasPrivateDomain: false,
    domainName: '',
    username: '',
    privateEmail: '',
    // verificatedNumber: 0,
    accountId: '',
    password: '',
  });

  const handleNextStep = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data })); // 기존 데이터 유지하면서 업데이트
    console.log('Updated FormData:', formData);
    nextStep(); // 다음 스텝 이동
  };
  const { mutate, isPending } = useMutation({
    ...authQueries.signUp,
    onSuccess: () => {},
  });

  const onSubmit = () => {
    mutate(formData);
  };

  return (
    <div className='text-foreground flex w-full flex-col items-center justify-center'>
      <ProgressBar steps={steps} currentStep={currentStepIndex} />
      <Form {...form}>
        <form
          className='flex flex-col items-center'
          onSubmit={form.handleSubmit(onSubmit)}
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
            <StepCheckInfo prevStep={prevStep} formData={formData} />
          )}
        </form>
      </Form>
    </div>
  );
};
