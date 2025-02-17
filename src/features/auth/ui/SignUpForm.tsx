// import { useFunnel } from '@use-funnel/react-router-dom';

import { useState } from 'react';

import { useFunnel } from '../model/useFunnel';
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
  const { step, nextStep, prevStep } = useFunnel(steps);
  const [formData, setFormData] = useState({
    teamName: '',
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='text-foreground flex w-full flex-col items-center'>
      {/* <ProgressBar steps={Steps} /> */}

      {step === '팀 정보 입력' && <StepTeamInfo nextStep={nextStep} />}
      {step === '개인 정보 입력' && (
        <StepPersonalInfo nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === '로그인 정보 입력' && (
        <StepSignInfo nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === '정보 확인' && <StepCheckInfo prevStep={prevStep} />}
    </div>
  );
};
