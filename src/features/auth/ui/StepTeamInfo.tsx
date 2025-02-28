import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { RHFSelect } from '@/shared/ui/custom/RHFSelect';
import { Button } from '@/shared/ui/shadcn/Button';

import { AUTH_FORM_STYLES, INDUSTRY, SCALE } from '../model/constants';
import { RHFInput } from './RHFInput';

interface StepTeamInfoProps {
  nextStep: (data: any) => void; // 데이터를 받을 수 있도록 함
}

export const StepTeamInfo = ({ nextStep }: StepTeamInfoProps) => {
  const { getValues, formState, setValue, watch } = useFormContext();
  const [hasDomainState, setHasDominState] = useState<boolean>(true);

  const [domainName, setDomainName] = useState<string>('');

  // 현재 'hasPrivateDomain' 값 가져오기
  const hasPrivateDomain = watch('hasPrivateDomain', hasDomainState);

  useEffect(() => {
    // console.log('useEffect', getValues());
    // console.log(domainName);
  }, [getValues, domainName]);

  useEffect(() => {
    if (!hasPrivateDomain || hasPrivateDomain === undefined) {
      setValue('domainName', '1lice-works.com');
    }
    console.log(getValues('domainName'));
  }, [hasPrivateDomain, setValue, formState]);

  // 해당 스텝에서 유효성을 검사할 필드 목록
  const stepFields = [
    'companyName',
    'teamName',
    'industry',
    'scale',
    // 'hasPrivateDomain',
    'domainName',
  ];

  const isCurrentStepValid = stepFields.every((field) => {
    // console.log('isAll valid!', field);
    const value = getValues(field);
    return value !== null && value !== undefined && !formState.errors[field];
  });

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
            items={INDUSTRY}
          />
          <RHFSelect
            label='규모'
            name='scale'
            placeholder='규모'
            items={SCALE}
          />
          <label>
            <p className={AUTH_FORM_STYLES.label}>도메인</p>
            <div className='mb-2 flex w-full justify-between gap-2'>
              <Button
                type='button'
                name='hasPrivateDomain'
                variant={hasPrivateDomain ? 'default' : 'outline'}
                className='w-full'
                disabled={hasPrivateDomain}
                onClick={() => {
                  setHasDominState(true);
                  setValue('hasPrivateDomain', true);
                }}
              >
                보유
              </Button>
              <Button
                type='button'
                name='hasPrivateDomain'
                variant={hasPrivateDomain ? 'outline' : 'default'}
                className='w-full'
                disabled={!hasPrivateDomain}
                onClick={() => {
                  setValue('hasPrivateDomain', false);
                  setHasDominState(false);
                }}
              >
                미보유
              </Button>
            </div>
            {hasPrivateDomain ? (
              <RHFInput
                onChange={(value) => setDomainName(value)}
                name='domainName'
                type='text'
                placeholder='ex.mydomain'
              />
            ) : (
              <></>
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
