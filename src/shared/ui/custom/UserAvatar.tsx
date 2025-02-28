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
    effect: {
      none: '',
      hover:
        'cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110',
    },
  },
  defaultVariants: {
    size: 'md',
    effect: 'none',
  },
});

interface UserAvatarProps
  extends React.ComponentPropsWithoutRef<typeof Avatar> {
  avatarUrl?: string;
}

export const UserAvatar = ({
  avatarUrl = '',
  size,
  effect,
  className,
  ...props
}: UserAvatarProps & VariantProps<typeof avatarVariants>) => {
  return (
    <Avatar
      className={cn(avatarVariants({ size, effect }), className)}
      {...props}
    >
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
