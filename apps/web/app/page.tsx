import { client } from '@/openapi.config';
import Image from 'next/image';
import EventList from './components/event-list';

export default async function Home() {
  const { data } = await client.GET('/event-group');

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
            <>
              <Image
                alt="カレンダー"
                src="/calender.png"
                width={250}
                height={250}
                className="shadow-2xl rounded-full w-64 h-64 object-contain mx-auto mb-8"
              />
              <p className="text-center text-lg">イベントがありません。</p>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
