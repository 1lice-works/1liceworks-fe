interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className='flex w-[338px]'>
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        return (
          <div
            key={step}
            className='flex w-full flex-col items-center justify-between'
          >
            <div className='text-center text-sm'>{step}</div>
            <div
              className={`flex h-8 w-8 overflow-hidden rounded-[50%] border-2 ${isActive ? 'border-[#4F46E5]' : 'border-[#D1D5DB]'}`}
            >
              <div
                className={`m-auto h-[11px] w-[11px] rounded-[50%] ${isActive ? 'bg-[#4F46E5]' : 'bg-gray-300'}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
