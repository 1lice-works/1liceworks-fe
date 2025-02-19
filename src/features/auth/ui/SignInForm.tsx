import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { AUTH_FORM_STYLES } from '../model/constants';

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: 'onBlur', // 입력 필드에서 벗어날 때 유효성 검사
  });

  const onSubmit = (data: SignInFormData) => {
    console.log('로그인 요청 데이터:', data);
    // 로그인 로직 추가
  };

  return (
    <form className={AUTH_FORM_STYLES.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={AUTH_FORM_STYLES.title}>팀 계정으로 로그인하세요.</h2>

      <div className={AUTH_FORM_STYLES.inputLayer}>
        <label className='flex flex-col gap-2'>
          <p className={AUTH_FORM_STYLES.label}>아이디</p>
          <Input
            type='email'
            placeholder='@id/mydomain.by-works.com'
            {...register('email', {
              required: '아이디를 입력해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '올바른 이메일 형식을 입력해주세요.',
              },
            })}
          />
          {errors.email && (
            <p className={AUTH_FORM_STYLES.errorMessage}>
              {errors.email.message}
            </p>
          )}
        </label>

        <label className={AUTH_FORM_STYLES.submit}>
          <p className='text-sm font-semibold'>비밀번호</p>
          <Input
            type='password'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && (
            <p className={AUTH_FORM_STYLES.errorMessage}>
              {errors.password.message}
            </p>
          )}
          <Link
            to={ROUTES.AUTH.FIND_PW}
            className='text-muted-foreground text-end text-sm underline'
          >
            비밀번호 찾기
          </Link>
        </label>
      </div>

      <div className={AUTH_FORM_STYLES.submit}>
        <Button className='w-full' type='submit'>
          로그인
        </Button>
        <div className='text-muted-foreground flex justify-between text-sm'>
          <p>팀을 만들고 싶은 팀장이신가요?</p>
          <Link className='underline' to={ROUTES.AUTH.SIGN_UP}>
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
};
