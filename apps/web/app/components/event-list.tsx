import { components } from '@/openapi/schema';
import ItemCard from '@repo/ui/components/custom/item-card';
import { User } from '@repo/ui/components/icons';
import { formatDate } from '../lib/format-date';

type EventListProps = {
  event: Omit<components['schemas']['EventGroupDto'], 'id'>;
};

const EventList = ({ event }: EventListProps) => {
  return (
    <li>
      <ItemCard>
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
    </li>
  );
};

export default EventList;
