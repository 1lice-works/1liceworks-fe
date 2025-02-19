import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { AUTH_FORM_STYLES } from '../model/constants';
import { RHFInput } from './RHFInput';

interface StepTeamInfoProps {
  nextStep: () => void;
}
// {/* <RHFInput label='' name='' type='' placeholder='' /> */}

export const StepTeamInfo = ({ nextStep }: StepTeamInfoProps) => {
  const handleNext = () => {
    nextStep();
  };

  return (
    <>
      <div className={AUTH_FORM_STYLES.title}>
        개설할 팀 계정의 정보를 입력해주세요.
      </div>
      <div className={AUTH_FORM_STYLES.form}>
        <div className={AUTH_FORM_STYLES.inputLayer}>
          <RHFInput
            label='회사'
            name='companyName'
            type='text'
            placeholder='회사명을 입력해주세요.'
          />
          <RHFInput
            label='팀'
            name='teamName'
            type='text'
            placeholder='팀 이름을 입력해주세요.'
          />
          <RHFInput
            label='업종'
            name='industry'
            type='text'
            placeholder='업종을 선택해주세요.'
          />
          <RHFInput
            label='규모'
            name='size'
            type='text'
            placeholder='규모를 선택해주세요.'
          />
          <label>
            <p className={AUTH_FORM_STYLES.label}>도메인</p>
            <div className='mb-2 flex w-full justify-between gap-2'>
              <Button className='w-full'>보유</Button>
              <Button className='w-full'>미보유</Button>
            </div>
            <Input type='text' placeholder='ex.mydomain' />
          </label>
        </div>
        <div className={AUTH_FORM_STYLES.submit}>
          <Button className='w-full' onClick={handleNext}>
            다음
          </Button>
          <div className={AUTH_FORM_STYLES.already}>
            <span>이미 회원이신가요?</span>
            <Link className='underline' to={ROUTES.AUTH.SIGN_IN}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
