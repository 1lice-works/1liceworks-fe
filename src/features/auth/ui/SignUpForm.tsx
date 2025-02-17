import { StepSignInfo } from './StepSignInfo';

// 전체 스텝을 담은 배열
const steps = ['팀 정보 입력', '개인 정보 입력', '로그인 정보 입력'];

export const SignUpForm = () => {
  return (
    <div className='text-foreground flex w-full items-center justify-center'>
      {/* <StepTeamInfo /> */}
      {/* <StepPersonalInfo /> */}
      <StepSignInfo />
    </div>
  );
};
