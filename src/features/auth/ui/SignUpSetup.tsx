import { FunnelProps, StepProps } from '@/shared/lib/useFunnel';

import { StepTeamInfo } from './StepTeamInfo';

export interface SignUpSetupInterface {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

export const SignUpSetup = () => {
  return (
    // <Funnel>
    //   <Step name='팀 정보 입력'>
    <StepTeamInfo />
    //   </Step>
    // </Funnel>
  );
};
