import { getImagePath } from '@/app/util/get-image-path';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components';
import { cn, cva, VariantProps } from '@repo/ui/lib/utils';
import Image from 'next/image';

const avatarVariants = cva('', {
  variants: {
    size: {
      default: 'size-10',
      sm: 'size-8',
      lg: 'size-16',
      xl: 'size-52',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const ProfileAvatar = ({
  userId,
  imageUrl,
  size,
  className,
  hoverAction = true,
}: {
  userId: string;
  imageUrl?: string;
  size?: VariantProps<typeof avatarVariants>['size'];
  className?: string;
  hoverAction?: boolean;
}) => {
  return (
    <Avatar
      className={cn(
        avatarVariants({ size }),
        hoverAction && 'overflow-hidden',
        className,
      )}
    >
      <AvatarImage
        src={imageUrl && getImagePath(imageUrl)}
        className={cn(hoverAction && 'hover:scale-110 duration-250')}
      />
      <AvatarFallback>
        <Image
          alt="アバター"
          src={`https://robohash.org/${userId}.png`}
          width={208}
          height={208}
          className={cn(
            'w-full',
            hoverAction && 'hover:scale-110 duration-250',
          )}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
