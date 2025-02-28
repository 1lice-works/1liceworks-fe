import SearchIcon from '@/widgets/gnb/ui/assets/search.svg?react';

// TODO) 검색 기능 붙이기
// TODO) 디렉터리 구조 검토 (features/calendar/ 가 더 적합할 것으로 보임)
export const SearchBar = () => {
  return (
    <div className='bg-background-light flex flex-1 items-center gap-x-2 rounded-4xl border px-4 py-2'>
      <SearchIcon className='h-5 w-5' />
      <input
        className='flex-1 text-sm focus:border-none focus:outline-none'
        placeholder='선택한 캘린더에서 일정을 검색하세요.'
      />
    </div>
  );
};
