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

interface ModalContainerWithHandlersProps extends ModalContainerProps {
  onLeftButtonClick: React.ComponentProps<typeof Button>['onClick'];
  onRightButtonClick: React.ComponentProps<typeof Button>['onClick'];
}

export const ModalContainer = ({
  title,
  description,
  content,
  leftButtonProps,
  onLeftButtonClick,
  rightButtonProps,
  onRightButtonClick,
}: ModalContainerWithHandlersProps) => {
  return (
    <Card className='w-1/3 max-w-fit overflow-x-hidden'>
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
          onClick={onLeftButtonClick}
        />
        <Button
          {...rightButtonProps}
          className={cn(rightButtonProps?.className)}
          onClick={onRightButtonClick}
        />
      </CardFooter>
    </Card>
  );
};
