import { Button } from '@/shared/ui/shadcn/Button';

export interface ModalContainerProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  leftButtonProps: React.ComponentProps<typeof Button>; // 왼쪽 버튼에 대한 추가 속성
  rightButtonProps: React.ComponentProps<typeof Button>; // 오른쪽 버튼에 대한 추가 속성
}
