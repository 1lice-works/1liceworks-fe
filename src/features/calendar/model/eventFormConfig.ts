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
  unit: 'minutes' | 'hours' | 'days';
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
