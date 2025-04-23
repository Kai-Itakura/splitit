import { client } from '@/openapi.config';

type EventDetailProps = {
  params: {
    eventId: string;
  };
};

const EventDetail = async ({ params }: EventDetailProps) => {
  const { eventId } = await params;
  const { error, data } = await client.GET('/event-group/{groupId}', {
    params: { path: { groupId: eventId } },
  });
  console.log('🔥 ~ EventDetail ~ error:', error);
  console.log('🔥 ~ EventDetail ~ data:', data);
  return <div>{eventId}</div>;
};

export default EventDetail;
