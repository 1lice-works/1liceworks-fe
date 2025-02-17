import { useState } from 'react';

export const useFunnel = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return {
    step: steps[currentStepIndex],
    nextStep,
    prevStep,
  };
};
