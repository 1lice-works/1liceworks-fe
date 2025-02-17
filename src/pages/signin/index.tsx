import { SignForm } from '../../features/auth/ui/SignForm';

export const SignInPage = () => {
  return (
    <div className='flex h-[100vh] w-full'>
      <div className='hidden h-full w-full bg-[#0F172A] lg:block'></div>
      <SignForm />
    </div>
  );
};
