import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs 사용을 위한 모듈화

dayjs.locale('ko');
dayjs.extend(relativeTime);

export function fromNow(time: string | Date) {
  return dayjs(time).fromNow();
}

export function formatAll(time: string | Date, format = 'YYYY-MM-DD A h:mm') {
  return dayjs(time).format(format);
}

export function formatTime(time: string | Date, format = 'HH:mm') {
  return dayjs(time).format(format);
}
