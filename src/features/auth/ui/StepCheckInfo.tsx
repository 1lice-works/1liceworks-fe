import { Button } from '@/shared/ui/shadcn/Button';

import { AUTH_FORM_STYLES } from '../model/constants';
import { SignUpFormTypes } from '../model/formTypes';

interface StepCheckInfoProps {
  prevStep: () => void;
  // handleChange: () => void;
  formData: SignUpFormTypes;
}

export const StepCheckInfo = ({
  prevStep,
  formData,
  // handleChange,
}: StepCheckInfoProps) => {
  return (
    <>
      <div className={AUTH_FORM_STYLES.title}>
        개설 완료 전 입력한 내용을
        <br />
        최종 확인해주세요.
      </div>
      <div className={AUTH_FORM_STYLES.form}>
        <div className='flex w-full flex-col border-t-2 border-[#E2E8F0]'>
          {/* <div className='flex w-full justify-between border-b-2 border-[#E2E8F0] p-4'> */}
          <div className={AUTH_FORM_STYLES.infoItem}>
            <div>회사</div>
            <div>{formData.companyName}</div>
          </div>
          <div className={AUTH_FORM_STYLES.infoItem}>
            <div>팀</div>
            <div>{formData.teamName}</div>
          </div>
          <div className={AUTH_FORM_STYLES.infoItem}>
            <div>이름</div>
            <div>{formData.username}</div>
          </div>
          <div className={AUTH_FORM_STYLES.infoItem}>
            <div>ID</div>
            <div>{formData.accountId}</div>
          </div>
        </div>
        <div className={AUTH_FORM_STYLES.submit}>
          <Button type='submit'>확인</Button>
          <Button variant='outline' onClick={prevStep}>
            이전
          </Button>
        </div>
      </div>
    </>
  );
};
