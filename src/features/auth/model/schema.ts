import { z } from 'zod';

// `signUpSchema`의 타입 자동 생성
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

// 로그인 폼 유효성 검사
export const signInSchema = z.object({
  email: z
    .string({ message: '아이디를 입력해주세요.' })
    .email({ message: '아이디를 올바르게 입력해 주세요.' }),
  password: z
    .string({ message: '비밀번호를 입력해주세요.' })
    .min(8, { message: '8자리 이상 입력해 주세요.' })
    .max(15, { message: '15자리 이하 입력해 주세요.' }),
});

// 회원가입 폼 유효성 검사
export const signUpSchema = z
  .object({
    companyName: z
      .string({ message: '회사 이름을 입력해주세요.' })
      .min(1, { message: '회사 이름을 입력해주세요.' })
      .regex(/^\S/, { message: '회사 이름의 첫 글자는 공백일 수 없습니다.' }),

    teamName: z
      .string()
      .min(1, { message: '팀 이름을 입력해주세요.' })
      .regex(/^\S/, { message: '팀 이름의 첫 글자는 공백일 수 없습니다.' }),
    industry: z.string(),
    scale: z.string(),
    hasPrivateDomain: z.boolean(),
    domainName: z
      .string()
      .min(3, { message: '도메인은 3글자 이상 입력해주세요.' }),
    username: z
      .string()
      .min(1, { message: '이름을 입력해주세요.' })
      .regex(/^\S/, { message: '이름의 첫 글자는 공백일 수 없습니다.' }),
    privateEmail: z
      .string()
      .email({ message: '이메일을 올바르게 입력해 주세요.' }),
    verificatedNumber: z
      .string()
      .min(1, { message: '인증번호를 입력해주세요.' }),
    isAgree: z.boolean(),

    accountId: z
      .string()
      // .min(1, { message: '한글자 이상 입력해주세요.' }),
      .email({ message: '이메일을 올바르게 입력해 주세요.' }),
    password: z
      .string()
      .min(8, {
        message:
          '비밀번호는 8~16자의 영문, 숫자, 특수문자를 조합해 만들어주세요.',
      })
      .max(16, {
        message:
          '비밀번호는 8~16자의 영문, 숫자, 특수문자를 조합해 만들어주세요.',
      })
      .refine(
        (value) =>
          /[A-Za-z]/.test(value) && // 최소 1개 이상의 영문자 포함
          /\d/.test(value) && // 최소 1개 이상의 숫자 포함
          /[!@#$%^&*()_+\-={};:'",.<>?/\\|]/.test(value), // 최소 1개 이상의 특수문자 포함
        {
          message:
            '비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.',
        }
      )
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'], // 에러를 표시할 필드 지정
  });

// 비밀번호 찾기 유효성 검사
export const findPWSchema = z.object({
  accountId: z.string().email({ message: '올바른 양식을 입력해주세요.' }),
  private_email: z
    .string()
    .email({ message: '이메일을 올바르게 입력해 주세요.' }),
  verificate: z.string().min(1, '인증번호를 입력해주세요.'),
  // newPassword: z
  //   .string()
  //   .min(8, {
  //     message:
  //       '비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합해 만들어주세요.',
  //   })
  //   .max(20, {
  //     message:
  //       '비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합해 만들어주세요.',
  //   })
  //   .refine(
  //     (value) => {
  //       for (let i = 0; i < value.length - 2; i++) {
  //         const firstChar = value.charCodeAt(i);
  //         const secondChar = value.charCodeAt(i + 1);
  //         const thirdChar = value.charCodeAt(i + 2);

  //         // 연속된 3개의 문자가 오름차순이거나 내림차순이면 false 반환
  //         if (
  //           (firstChar + 1 === secondChar && secondChar + 1 === thirdChar) ||
  //           (firstChar - 1 === secondChar && secondChar - 1 === thirdChar)
  //         ) {
  //           return false;
  //         }
  //       }
  //       return true;
  //     },
  //     {
  //       message: '비밀번호에 연속된 문자를 3번 이상 사용할 수 없습니다.',
  //     }
  //   ),
});
