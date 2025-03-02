import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { queryClient } from '@/shared/api/queryClient';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/shadcn/Button';
import { Form } from '@/shared/ui/shadcn/Form';

import { authQueries } from '../api/queries';
import { AUTH_FORM_STYLES } from '../model/constants';
import { signInSchema } from '../model/schema';
import { RHFInput } from './RHFInput';

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const navigate = useNavigate();
  const form = useForm<SignInFormData>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const { mutate } = useMutation({
    ...authQueries.signIn,
    onSuccess: async () => {
      try {
        await queryClient.prefetchQuery(authQueries.getMyMinimalProfile);
      } catch (error) {
        console.error('미니멀 프로필 정보 가져오기 실패', error);
      } finally {
        navigate(ROUTES.ROOT);
      }
    },
    onError: (error) => {
      console.log(error);
      form.setError('email', {
        type: 'manual',
        message: '로그인 정보가 일치하지 않습니다.',
      });
    },
  });

  const onSubmit = (data: SignInFormData) => {
    mutate({ accountId: data.email, password: data.password });
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
              to={ROUTES.AUTH.FIND_PW}
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
