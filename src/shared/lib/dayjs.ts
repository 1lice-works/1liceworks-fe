import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs 사용을 위한 모듈화

dayjs.locale('ko');
dayjs.extend(relativeTime);

export function formYMD(time: string | Date, format = 'YYYY년MM월DD일') {
  return dayjs(time).format(format);
}
export function formYMDT(
  time: string | Date,
  format = 'YYYY년MM월DD일 A h시mm분'
) {
  return dayjs(time).format(format);
}

export function formatAll(time: string | Date, format = 'YYYY-MM-DD A h:mm') {
  return dayjs(time).format(format);
}

export function formatTime(time: string | Date, format = 'HH:mm') {
  return dayjs(time).format(format);
}
