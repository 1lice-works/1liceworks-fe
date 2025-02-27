import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from '@/shared/ui/shadcn/Form';

import { FIND_PW } from '../model/constants';
import { FindPWFormTypes } from '../model/formTypes';
import { findPWSchema } from '../model/schema';
import { useFunnel } from '../model/useFunnel';
import { StepFPWInfo } from './StepFPWInfo';
import { StepNewPW } from './StepNewPW';

const steps = ['개인 정보 입력', '비밀번호 설정'];

export const FindPasswordForm = () => {
  const { step, currentStepIndex, nextStep, prevStep } = useFunnel({ steps });
  const form = useForm<FindPWFormTypes>({
    mode: 'onChange',
    resolver: zodResolver(findPWSchema),
  });

  const [formData, setFormData] = useState<FindPWFormTypes>({
    accountId: '',
    private_email: '',
    verificate: '',
    password: '',
  });
  console.log(formData);
  console.log(currentStepIndex);

  const handleNextStep = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data })); // 기존 데이터 유지하면서 업데이트
    nextStep(); // 다음 스텝 이동
  };

  return (
    <div>
      <Form {...form}>
        <form className='flex flex-col items-center'>
          {step === FIND_PW.PERSONAL_INFO && (
            <StepFPWInfo nextStep={handleNextStep} />
          )}
          {step === FIND_PW.RESET_PW && <StepNewPW prevStep={prevStep} />}
        </form>
      </Form>
    </div>
  );
};
