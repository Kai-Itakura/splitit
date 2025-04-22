import { ReactNode } from 'react';
import { Card } from '../ui/card';

const ItemCard = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="flex-row justify-between items-center py-4 px-4 gap-2 shadow-xl">
      {children}
    </Card>
  );
};

export default ItemCard;
