import { Button } from '@/shared/ui/button';

import { AUTH_FORM_STYLES } from '../model/constants';

interface StepCheckInfoProps {
  prevStep: () => void;
}

export const StepCheckInfo = ({ prevStep }: StepCheckInfoProps) => {
  return (
    <form className={AUTH_FORM_STYLES.form}>
      <div className={AUTH_FORM_STYLES.title}>
        개설 완료 전 입력한 내용을
        <br />
        최종 확인해주세요.
      </div>
      <div></div>
      <div className={AUTH_FORM_STYLES.submit}>
        <Button>확인</Button>
        <Button variant='outline' onClick={prevStep}>
          이전
        </Button>
      </div>
    </form>
  );
};
