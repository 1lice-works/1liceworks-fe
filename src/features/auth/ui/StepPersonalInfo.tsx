import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';

import { AUTH_FORM_STYLES } from '../model/constants';

export const StepPersonalInfo = () => {
  return (
    <form className={AUTH_FORM_STYLES.form}>
      <div className={AUTH_FORM_STYLES.title}>
        가입에 필요한 개인 정보를 입력해 주세요.
        <br />
        개설을 완료하면 이 팀 계정의 최고 관리자가 됩니다.
      </div>
      <div className={AUTH_FORM_STYLES.inputLayer}>
        <label>
          <p className={AUTH_FORM_STYLES.label}>이름</p>
          <Input type='text' placeholder='이름을 입력해주세요.' />
        </label>
        <label>
          <p className={AUTH_FORM_STYLES.label}>개인 이메일 주소</p>
          <div className='mb-1 flex gap-1'>
            <Input type='text' placeholder='이메일을 입력해주세요.' />
            <Button>인증</Button>
          </div>
          <div className='flex gap-1'>
            <Input type='text' placeholder='인증번호를 입력해주세요.' />
            <Button>확인</Button>
          </div>
        </label>
        <div className={AUTH_FORM_STYLES.inputLayer}>
          <label className='flex items-center gap-4 rounded-md border-1 border-[#F1F5F9] bg-[#F8FAFC] p-2'>
            <Checkbox />
            모든 항목에 동의 합니다.
          </label>
          <div className='flex flex-col gap-1 p-2 text-xs'>
            <label className={AUTH_FORM_STYLES.checkBox}>
              <Checkbox />
              [필수] 개인정보 수집 및 이용 안내
            </label>
            <label className={AUTH_FORM_STYLES.checkBox}>
              <Checkbox />
              [필수] 개인정보 보호법 개인정보 처리자의 의무 확인
            </label>
          </div>
          <div className='flex w-full gap-2'>
            <Button className='w-[50%]' variant='outline'>
              이전
            </Button>
            <Button className='w-full'>다음</Button>
          </div>
        </div>
      </div>
    </form>
  );
};
