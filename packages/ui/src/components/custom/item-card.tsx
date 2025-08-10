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
        'flex-row justify-between items-center px-3 py-2 gap-2 shadow-xl md:px-5 md:py-3',
        className,
      ])}
    >
      {children}
    </Card>
  );
};

export default ItemCard;
