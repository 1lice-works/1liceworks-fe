import { DetailForm } from './DetailForm';
import { FindEmptyTime } from './FindEmptyTime';

export const CalendarDetail = () => {
  return (
    <div className='flex h-full w-full flex-col gap-4 lg:flex-row'>
      <DetailForm />
      <FindEmptyTime />
    </div>
  );
};
