import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),
  password: z
    .string()
    .min(8, { message: '8자리 이상 입력해 주세요.' })
    .max(15, { message: '15자리 이하 입력해 주세요.' }),
});

export const signUpSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: '회사 이름을 입력해주세요.' })
    .regex(/^\S/, { message: '회사 이름의 첫 글자는 공백일 수 없습니다.' }),

  teamName: z
    .string()
    .min(1, { message: '팀 이름을 입력해주세요.' })
    .regex(/^\S/, { message: '팀 이름의 첫 글자는 공백일 수 없습니다.' }),
  industry: z.string(),
  size: z.number(),
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .regex(/^\S/, { message: '이름의 첫 글자는 공백일 수 없습니다.' }),
  email: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),
  verificatedNumber: z.number().min(1, { message: '인증번호를 입력해주세요.' }),
});
