'use client';

import { components } from '@/openapi/schema';
import ItemCard from '@repo/ui/components/custom/item-card';
import { User } from '@repo/ui/components/icons';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { formatDate } from '../../lib/format-date';

type EventListProps = {
  event: components['schemas']['ReturnGroupDto'];
};

const EventList = ({ event }: EventListProps) => {
  const router = useRouter();

  const onItemCardClick: MouseEventHandler<HTMLDivElement> = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <ItemCard
      onClick={onItemCardClick}
      className="cursor-pointer hover:bg-gray-50"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">{event.title}</h2>
        <p className="text-sm text-slate-500">
          作成日: {formatDate(new Date(event.createdAt))}
        </p>
      </div>
      <div className="flex justify-center items-center gap-1 text-slate-500">
        <User size={14} />
        <span>{event.memberCount}</span>
      </div>
    </ItemCard>
  );
};

export default EventList;
