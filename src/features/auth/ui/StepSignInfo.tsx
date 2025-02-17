import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { AUTH_FORM_STYLES } from '../model/constants';

export const StepSignInfo = () => {
  return (
    <form className={AUTH_FORM_STYLES.form}>
      <div className={AUTH_FORM_STYLES.title}>
        로그인에 사용할 계정 정보를 입력해주세요.
      </div>
      <div className={AUTH_FORM_STYLES.inputLayer}>
        <label>
          <p className={AUTH_FORM_STYLES.label}>아이디</p>
          <div className={AUTH_FORM_STYLES.inputAndButton}>
            <Input type='text' placeholder='ID  @mydomain.1lice-work.com' />
            <Button>중복 확인</Button>
          </div>
          <p className='text-muted-foreground text-xs'>
            ID는 'ID@mydomain.ilice-works.com' 형식으로, 로그인 시 사용됩니다.
          </p>
        </label>
        <label>
          <p className={AUTH_FORM_STYLES.label}>비밀번호</p>
          <Input type='password' placeholder='비밀번호를 입력해주세요.' />
          <Input
            type='password'
            placeholder='비밀번호를 다시한번 입력해주세요.'
            className='mt-1'
          />
          <div className='mt-1 px-2'>
            <ul className='text-muted-foreground list-disc text-xs'>
              <li className='ml-[12px]'>
                비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합해 만들어주세요.
              </li>
              <li className='ml-[12px]'>
                비밀번호에는 3자 이상 반복 또는 연속되는 문자를 사용할 수
                없습니다.
              </li>
            </ul>
          </div>
        </label>

        <div className='flex w-full gap-2'>
          <Button className='w-[50%]' variant='outline'>
            이전
          </Button>
          <Button className='w-full'>다음</Button>
        </div>
      </div>
    </form>
  );
};
