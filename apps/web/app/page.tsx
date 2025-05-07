import { client } from '@/openapi.config';
import { Button } from '@repo/ui/components';
import { Plus } from '@repo/ui/components/icons';
import Image from 'next/image';
import CreateEventDialog from './components/create-event-dialog';
import EventList from './components/event-list';

export default async function Home() {
  const { data } = await client.GET('/event-group');

  return (
    <div className="flex justify-center min-h-svh mt-10">
      <div className="w-full">
        <h1 className="font-extrabold text-center">イベント一覧</h1>
        <div className="mt-10">
          {data ? (
            <>
              <ul>
                {data.map((event) => (
                  <EventList event={event} key={event.id}></EventList>
                ))}
              </ul>
              <CreateEventDialog>
                <Plus className="fixed bottom-5 right-5 z-50 rounded-full shadow-xl p-1 w-10 h-10 bg-foreground hover:opacity-85 text-background cursor-pointer" />
              </CreateEventDialog>
            </>
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
              <CreateEventDialog>
                <Button
                  variant="outline"
                  className="flex mx-auto mt-6 cursor-pointer"
                >
                  イベントを作成
                </Button>
              </CreateEventDialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
