import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';

import { AUTH_FORM_STYLES } from '../model/constants';
import { signInSchema } from '../model/schema';
import { RHFInput } from './RHFInput';

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const form = useForm<SignInFormData>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log('로그인 요청 데이터:', data);
  };

  return (
    <Form {...form}>
      <form
        className={AUTH_FORM_STYLES.form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className={AUTH_FORM_STYLES.title}>팀 계정으로 로그인하세요.</div>
        <div className={AUTH_FORM_STYLES.inputLayer}>
          <RHFInput
            label='ID'
            name='email'
            type='email'
            placeholder='id@mydomain.by-works.com'
          />
          <RHFInput
            label='비밀번호'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
          />
          <div className='flex justify-end'>
            <Link
              to={ROUTES.AUTH.SIGN_UP}
              className={`underline ${AUTH_FORM_STYLES.already}`}
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>
        <div className={AUTH_FORM_STYLES.submit}>
          <Button type='submit'>로그인</Button>
          <div className={` ${AUTH_FORM_STYLES.already}`}>
            <span>팀을 만들고 싶은 팀장이신가요?</span>
            <Link to={ROUTES.AUTH.SIGN_UP} className='underline'>
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
