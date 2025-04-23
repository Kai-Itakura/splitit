import { cn } from '@repo/ui/lib/utils';
import { ComponentProps, ReactNode } from 'react';
import { Card } from '../ui/card';

type ItemCardProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'div'>;

const ItemCard = ({ children, className, ...props }: ItemCardProps) => {
  return (
    <Card
      {...props}
      className={cn([
        className,
        'flex-row justify-between items-center py-4 px-4 gap-2 shadow-xl',
      ])}
    >
      {children}
    </Card>
  );
};

export default ItemCard;
