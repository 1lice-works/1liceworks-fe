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

  userId: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),
  password: z
    .string()
    .min(8, {
      message:
        '비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합해 만들어주세요.',
    })
    .max(20, {
      message:
        '비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합해 만들어주세요.',
    })
    .refine(
      (value) => {
        for (let i = 0; i < value.length - 2; i++) {
          const firstChar = value.charCodeAt(i);
          const secondChar = value.charCodeAt(i + 1);
          const thirdChar = value.charCodeAt(i + 2);

          // 연속된 3개의 문자가 오름차순이거나 내림차순이면 false 반환
          if (
            (firstChar + 1 === secondChar && secondChar + 1 === thirdChar) ||
            (firstChar - 1 === secondChar && secondChar - 1 === thirdChar)
          ) {
            return false;
          }
        }
        return true;
      },
      {
        message: '비밀번호에 연속된 문자를 3번 이상 사용할 수 없습니다.',
      }
    ),
});
