import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { RHFSelect } from '@/shared/ui/custom/RHFSelect';
import { Button } from '@/shared/ui/shadcn/Button';

import { AUTH_FORM_STYLES } from '../model/constants';
import { RHFInput } from './RHFInput';

interface StepTeamInfoProps {
  nextStep: (data: any) => void; // 수정: 데이터를 받을 수 있도록 함
}
// {/* <RHFInput label='' name='' type='' placeholder='' /> */}

export const StepTeamInfo = ({ nextStep }: StepTeamInfoProps) => {
  const { getValues, formState, setValue, watch } = useFormContext();

  // 현재 'hasPrivateDomain' 값 가져오기
  const hasPrivateDomain = watch('hasPrivateDomain', false);
  // 해당 스텝에서 유효성을 검사할 필드 목록
  const stepFields = [
    'companyName',
    'teamName',
    'industry',
    'scale',
    'hasPrivateDomain',
    'domainName',
  ];

  // 해당 스텝의 필드만 검사
  const isCurrentStepValid = stepFields.every(
    (field) => !formState.errors[field]
  );

  const handleNext = () => {
    if (!isCurrentStepValid) {
      console.log('현재 단계의 필수 입력값이 누락되었습니다.');
      return;
    }

    const formData = getValues(); // 현재 입력된 폼 데이터를 가져옴
    nextStep(formData); // 다음 스텝으로 이동할 때 데이터 전달
  };

  return (
    <>
      <div className={AUTH_FORM_STYLES.title}>
        개설할 팀 계정의 정보를 입력해주세요.
      </div>
      <div className={AUTH_FORM_STYLES.form}>
        <div className={AUTH_FORM_STYLES.inputLayer}>
          <RHFInput
            label='회사'
            name='companyName'
            type='text'
            placeholder='회사명을 입력해주세요.'
          />
          <RHFInput
            label='팀'
            name='teamName'
            type='text'
            placeholder='팀 이름을 입력해주세요.'
          />
          <RHFSelect
            name='industry'
            label='업종'
            placeholder='업종'
            items={[
              { value: 'IT', item: 'IT' },
              { value: 'CONSTRUCTION', item: '건설' },
            ]}
          />
          <RHFSelect
            label='규모'
            name='scale'
            placeholder='규모'
            items={[
              { value: 'ONE', item: '스타트업' },
              { value: 'TWO', item: '중소기업' },
            ]}
          />
          <label>
            <p className={AUTH_FORM_STYLES.label}>도메인</p>
            <div className='mb-2 flex w-full justify-between gap-2'>
              <Button
                type='button'
                name='hasPrivateDomain'
                className='w-full'
                disabled={hasPrivateDomain}
                onClick={() => setValue('hasPrivateDomain', true)}
              >
                보유
              </Button>
              <Button
                type='button'
                name='hasPrivateDomain'
                className='w-full'
                disabled={!hasPrivateDomain}
                onClick={() => setValue('hasPrivateDomain', false)}
              >
                미보유
              </Button>
            </div>
            {hasPrivateDomain && (
              <RHFInput
                type='text'
                name='domainName'
                placeholder='ex.mydomain'
              />
            )}
          </label>
        </div>
        <div className={AUTH_FORM_STYLES.submit}>
          <Button
            type='button'
            className='w-full'
            onClick={handleNext}
            disabled={!isCurrentStepValid}
          >
            다음
          </Button>
          <div className={AUTH_FORM_STYLES.already}>
            <span>이미 회원이신가요?</span>
            <Link className='underline' to={ROUTES.AUTH.SIGN_IN}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
