import { client } from '@/openapi.config';
import { redirect } from 'next/navigation';
import EventList from './components/event-list';

export default async function Home() {
  const { error, data } = await client.GET('/event-group');

  if (error?.statusCode === 401) {
    redirect('login');
  }

  return (
    <div className="flex justify-center min-h-svh mt-10">
      <div className="w-full">
        <h1 className="font-extrabold text-center">イベント一覧</h1>
        <ul className="mt-10">
          {data ? (
            data.map((event) => (
              <EventList event={event} key={event.id}></EventList>
            ))
          ) : (
            <p className="text-center">イベントがありません。</p>
          )}
        </ul>
      </div>
    </div>
  );
}
