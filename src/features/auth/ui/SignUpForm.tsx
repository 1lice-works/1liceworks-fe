// import { useFunnel } from '@use-funnel/react-router-dom';

import { useState } from 'react';

import { FUNNEL_STEP } from '../model/constants';
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
  const [formData, setFormData] = useState({
    teamName: '',
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='text-foreground flex w-full flex-col items-center'>
      <ProgressBar steps={steps} currentStep={currentStepIndex} />

      {step === FUNNEL_STEP.TEAM_INFO && <StepTeamInfo nextStep={nextStep} />}
      {step === FUNNEL_STEP.PERSONAL_INFO && (
        <StepPersonalInfo nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === FUNNEL_STEP.SIGN_INFO && (
        <StepSignInfo nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === FUNNEL_STEP.CHECK_INFO && <StepCheckInfo prevStep={prevStep} />}
    </div>
  );
};
