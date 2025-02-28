import { cva, VariantProps } from 'class-variance-authority';
import { User } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/Avatar';

const avatarVariants = cva('border', {
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface UserAvatarProps
  extends React.ComponentPropsWithoutRef<typeof Avatar> {
  avatarUrl?: string;
}

export const UserAvatar = ({
  avatarUrl = '',
  size,
  className,
  ...props
}: UserAvatarProps & VariantProps<typeof avatarVariants>) => {
  return (
    <Avatar className={cn(avatarVariants({ size }), className)} {...props}>
      <AvatarImage
        src={avatarUrl}
        alt={`user's avatar`}
        className='h-full w-full object-cover'
      />
      <AvatarFallback className={cn('bg-background-light')}>
        <User className='text-muted-foreground' />
      </AvatarFallback>
    </Avatar>
  );
};
