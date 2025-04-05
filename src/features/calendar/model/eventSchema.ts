import { z } from 'zod';

const notificationSchema = z.object({
  id: z.number(),
  time: z.number().min(0).max(1000),
  unit: z.enum(['minutes', 'hours', 'days', 'weeks']),
});

const participantSchema = z.object({
  userId: z.number(),
  name: z.string(),
});

export const eventSchema = z
  .object({
    title: z.string().min(1, { message: '제목을 입력해주세요.' }),
    startDate: z.string().min(1, { message: '시작일을 입력해주세요.' }),
    startTime: z.string().min(1, { message: '시작 시간을 입력해주세요.' }),
    endDate: z.string().min(1, { message: '종료일을 입력해주세요.' }),
    endTime: z.string().min(1, { message: '종료 시간을 입력해주세요.' }),
    allDay: z.boolean().default(true),
    location: z.string().optional(),
    notification: z.array(notificationSchema).optional(),
    // selectedCalendarId: z.string(),
    privacyType: z.enum(['PUBLIC', 'PRIVATE'] as const).default('PUBLIC'),
    availability: z.enum(['FREE', 'BUSY'] as const).default('FREE'),
    participants: z.array(participantSchema).optional(), // isTeamEvent일 떄만 나타나는 속성. Option 타입 (label, value)
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.startDate <= data.endDate;
    },
    {
      message: '일정 종료는 시작 시간 이후여야 합니다.',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      if (data.startDate === data.endDate && !data.allDay) {
        return data.startTime <= data.endTime;
      }

      return true;
    },
    {
      message: '일정 종료는 시작 시간 이후여야 합니다.',
      path: ['endTime'],
    }
  );
