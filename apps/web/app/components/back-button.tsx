'use client';

import { Button } from '@repo/ui/components';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';

const BackButton = ({
  className,
  ...props
}: Omit<React.ComponentProps<'button'>, 'onClick'>) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      {...props}
      className={cn([className, 'w-full cursor-pointer'])}
    />
  );
};

export default BackButton;
