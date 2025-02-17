import { SignInForm } from '@/features/auth/ui/SignInForm';

export const SignInPage = () => {
  return (
    <div className='flex h-[100vh] w-full'>
      {/* <div className='hidden h-full w-full bg-[#0F172A] lg:block'></div> */}
      <div className='w-full'>
        <SignInForm />
      </div>
    </div>
  );
};
