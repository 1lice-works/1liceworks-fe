import {
  AvailabilityTypeDTO,
  CalendarTypeDTO,
  PrivacyTypeDTO,
} from '@/features/calendar/api/dto';

export type CalendarType = CalendarTypeDTO;
export type PrivacyType = PrivacyTypeDTO;
export type AvailabilityType = AvailabilityTypeDTO;

export type NotificationType = {
  id: number;
  time: string;
  unit: 'minutes' | 'hours' | 'days' | 'weeks';
};

export type Participant = {
  userId: number;
  name: string;
};

export interface EventFormData {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  allDay: boolean;
  location?: string;
  notifications?: NotificationType[];
  selectedCalendarId: string;
  visibility: PrivacyType;
  availability: AvailabilityType;
  participants?: Participant[];
  description?: string;
}

export interface FormFieldConfig {
  name: keyof EventFormData | string;
  label?: string;
  type:
    | 'text'
    | 'date'
    | 'time'
    | 'checkbox'
    | 'textarea'
    | 'select'
    | 'multiselect'
    | 'notiselect';
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  className?: string;
  disabled?: boolean | ((data: EventFormData) => boolean);
  hidden?: boolean | ((data: EventFormData) => boolean);
}

//**
// TODO
// 1. 생성시) 기본 시작일: 오늘, 현재 시간 분단위 반올림 (18:08 -> 18:10)
// 2. 생성시) 기본 종료일: 시작 시간 1시간 이후
// 3. allDay === True일 경우 시작 시간 00:00, 종료 시간 23:59으로 설정해 폼 제출 */
