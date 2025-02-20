import { z } from 'zod';

export const eventsSchema = z.object({
  title: z.string().min(1, { message: '일정은 한 글자 이상 입력해주세요.' }),
  start: z.string(),
  end: z.date(),
  description: z.string().min(1, { message: '설명을 입력해 주세요.' }),
});
