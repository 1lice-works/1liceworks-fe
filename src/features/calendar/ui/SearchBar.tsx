import { CalendarSearch } from 'lucide-react';

// TODO) 검색 기능 붙이기
export const SearchBar = () => {
  return (
    <div className='bg-background-light flex flex-1 items-center gap-x-2 rounded-4xl border px-4 py-2'>
      <CalendarSearch size='0.875rem' />
      <input
        className='flex-1 text-sm focus:border-none focus:outline-none'
        placeholder='선택한 캘린더에서 일정을 검색하세요.'
      />
    </div>
  );
};
