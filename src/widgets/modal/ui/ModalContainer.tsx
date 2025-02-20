import { Button } from '@/shared/ui/shadcn/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/shadcn/Card';
import { Input } from '@/shared/ui/shadcn/Input';
import { Separator } from '@/shared/ui/shadcn/Separator';

export const ModalContainer = () => {
  return (
    <Card className='w-1/3 min-w-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className='flex flex-col gap-y-4 pt-6'>
          <Input />
          <Input />
          <Input />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end space-x-3'>
        <Button variant='outline'>취소</Button>
        <Button>확인</Button>
      </CardFooter>
    </Card>
  );
};
