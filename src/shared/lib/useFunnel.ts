import React, { ReactElement, ReactNode, useState } from 'react';

// 각 단계(Step)의 Props 타입
export interface StepProps {
  name: string;
  children: ReactNode;
}

// Funnel의 Props 타입
export interface FunnelProps {
  children: ReactNode;
}

// Step 컴포넌트 (Funnel 내에서 사용)
export const Step = ({ children }: StepProps): ReactElement => {
  return <>{children}</>;
};

// useFunnel 훅 정의
export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  // Funnel 컴포넌트 정의 (현재 단계만 렌더링)
  const Funnel = ({ children }: FunnelProps) => {
    const stepsArray = React.Children.toArray(children) as ReactElement<StepProps>[]; // children을 배열로 변환
    const targetStep = stepsArray.find((child) => child.props.name === step);

    return <>{targetStep}</>;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
