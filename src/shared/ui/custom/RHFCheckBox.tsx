import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';

import { Checkbox } from '../shadcn/Checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../shadcn/Form';
import { Label } from '../shadcn/Label';

interface RHFCheckBoxProps {
  name: string;
  label: string;
  description?: string;
  wrapperClassName?: string;
}

export const RHFCheckBox = ({
  name,
  label,
  description,
  wrapperClassName,
}: RHFCheckBoxProps) => {
  const { control, setValue, watch } = useFormContext();

  // 개별 체크박스 상태 확인
  const agree1 = watch('agree1');
  const agree2 = watch('agree2');
  const agreeAll = watch('isAgree');

  // 전체 동의 체크박스 핸들러
  const handleAgreeAllChange = (checked: boolean) => {
    setValue('isAgree', checked);
    setValue('agree1', checked);
    setValue('agree2', checked);
  };

  // 개별 체크박스 핸들러 (둘 다 체크되면 전체 동의 체크)
  const handleIndividualChange = () => {
    const allChecked = watch('agree1') && watch('agree2');
    setValue('isAgree', allChecked);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(wrapperClassName, 'flex flex-col gap-2')}>
          <FormControl>
            <div className='flex flex-col gap-2'>
              {/* 전체 동의 체크박스 */}
              <div className='flex items-center gap-2 rounded-md border-1 border-[#F1F5F9] bg-[#F8FAFC] p-2'>
                <Checkbox
                  id={name}
                  checked={agreeAll}
                  {...field}
                  onCheckedChange={handleAgreeAllChange}
                />
                <Label htmlFor={name}>{label}</Label>
              </div>

              {/* 개별 체크박스들 */}
              <div className='flex items-center gap-2 px-2 text-sm'>
                <Checkbox
                  id='agree1'
                  checked={agree1}
                  onCheckedChange={(checked) => {
                    setValue('agree1', checked);
                    handleIndividualChange();
                  }}
                />
                <p>[필수] 개인정보 수집 및 이용 안내</p>
              </div>
              <div className='flex items-center gap-2 px-2 text-sm'>
                <Checkbox
                  id='agree2'
                  checked={agree2}
                  onCheckedChange={(checked) => {
                    setValue('agree2', checked);
                    handleIndividualChange();
                  }}
                />
                <p>[필수] 개인정보 보호법 개인정보 처리자의 의무 확인</p>
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
