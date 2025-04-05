import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ko');
dayjs.extend(relativeTime);

// 2025년 2월 28일
export const formatDate = (time: string | Date, format = 'LL') => {
  return dayjs(time).format(format);
};

// 2025년 2월 28일 오전 11:30
export const formatDateTime = (time: string | Date, format = 'LLL') => {
  return dayjs(time).format(format);
};

// 오후 6:05
export const formatTime = (time: string | Date, format = 'LT') => {
  return dayjs(time).format(format);
};

// 주어진 start와 end가 동일한 날짜에 속하는지 확인하는 함수
export const isSameDate = (
  start: string | Date,
  end: string | Date
): boolean => {
  return dayjs(start).isSame(dayjs(end), 'day');
};
