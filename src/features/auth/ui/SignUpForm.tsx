// import { useFunnel } from '@use-funnel/react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/shared/ui/form';

import { AUTH_FORM_STYLES, FUNNEL_STEP } from '../model/constants';
import { SignUpFormTypes } from '../model/formTypes';
import { signUpSchema } from '../model/schema';
import { useFunnel } from '../model/useFunnel';
import { ProgressBar } from './ProgressBar';
import { StepPersonalInfo } from './StepPersonalInfo';
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
  // const [formData, setFormData] = useState({
  //   teamName: '',
  //   userName: '',
  //   email: '',
  //   password: '',
  // });

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const onSubmit = () => {};

  return (
    <div className='text-foreground flex w-full flex-col items-center'>
      <ProgressBar steps={steps} currentStep={currentStepIndex} />
      <Form {...form}>
        <form
          className={AUTH_FORM_STYLES.form}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {step === FUNNEL_STEP.TEAM_INFO && (
            <StepTeamInfo nextStep={nextStep} />
          )}
          {step === FUNNEL_STEP.PERSONAL_INFO && (
            <StepPersonalInfo nextStep={nextStep} prevStep={prevStep} />
          )}
        </form>
      </Form>

      {/* {step === FUNNEL_STEP.SIGN_INFO && (
        <StepSignInfo nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === FUNNEL_STEP.CHECK_INFO && <StepCheckInfo prevStep={prevStep} />} */}
    </div>
  );
};
