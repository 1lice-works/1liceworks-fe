import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { AUTH_FORM_STYLES } from '../model/constants';

export const StepTeamInfo = () => {
  return (
    <form className={AUTH_FORM_STYLES.form}>
      <div className={AUTH_FORM_STYLES.title}>
        개설할 팀 계정의 정보를 입력해주세요.
      </div>
      <div className={AUTH_FORM_STYLES.inputLayer}>
        <label>
          <p className={AUTH_FORM_STYLES.label}>회사</p>
          <Input type='text' placeholder='회사명을 입력해주세요.' />
        </label>
        <label>
          <p className={AUTH_FORM_STYLES.label}>팀</p>
          <Input type='text' placeholder='팀명을 입력해주세요.' />
        </label>
        <label>
          <p className={AUTH_FORM_STYLES.label}>업종</p>
          <Input type='text' placeholder='업종을 선택해 주세요.' />
        </label>
        <label>
          <p className={AUTH_FORM_STYLES.label}>규모</p>
          <Input type='text' placeholder='규모를 선택해 주세요.' />
        </label>
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
        <Button type='submit' className='w-full'>
          다음
        </Button>
        <div className={AUTH_FORM_STYLES.already}>
          <span>이미 회원이신가요?</span>
          <span>로그인</span>
        </div>
      </div>
    </form>
  );
};
