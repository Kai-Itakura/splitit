import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components';
import { cva, VariantProps } from '@repo/ui/lib/utils';
import Image from 'next/image';

const avatarVariants = cva('hover:border-1 duration-50', {
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
  size,
}: {
  userId: string;
  size?: VariantProps<typeof avatarVariants>['size'];
}) => {
  return (
    <Avatar className={avatarVariants({ size })}>
      <AvatarImage />
      <AvatarFallback>
        <Image
          className="w-full"
          alt="アバター"
          src={`https://robohash.org/${userId}.png`}
          width={208}
          height={208}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
