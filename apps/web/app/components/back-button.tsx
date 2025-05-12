'use client';

import { Button } from '@repo/ui/components';
import { ChevronLeft } from '@repo/ui/components/icons';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';

const BackButton = ({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<'button'>, 'onClick'>) => {
  const router = useRouter();

  return (
    <div className="sticky bg-white mb-4 -ml-6 p-2 w-dvw z-40 shadow-sm">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        {...props}
        className={cn([className, 'gap-1 cursor-pointer'])}
      >
        <ChevronLeft />
        {children}
      </Button>
    </div>
  );
};

export default BackButton;
