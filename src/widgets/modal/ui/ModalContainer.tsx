import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/shadcn/Card';
import { Separator } from '@/shared/ui/shadcn/Separator';

import { ModalContainerProps } from '../model/ModalContainerProps';

export const ModalContainer = ({
  title,
  description,
  content,
  leftButtonProps,
  rightButtonProps,
}: ModalContainerProps) => {
  return (
    <Card className='w-1/3 min-w-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && (
        <CardContent>
          <Separator />
          <div className='flex flex-col gap-y-4 pt-6'>{content}</div>
        </CardContent>
      )}
      <CardFooter className='flex justify-end space-x-3'>
        <Button
          variant='outline'
          {...leftButtonProps}
          className={cn(leftButtonProps?.className)}
        />
        <Button
          {...rightButtonProps}
          className={cn(rightButtonProps?.className)}
        />
      </CardFooter>
    </Card>
  );
};
