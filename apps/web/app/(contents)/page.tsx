import { client } from '@/openapi.config';
import { Button } from '@repo/ui/components';
import { Plus } from '@repo/ui/components/icons';
import CreateEventDialog from './components/create-event-dialog';
import EventList from './components/event-list';
import NoItems from './components/no-items';

export default async function Home() {
  const { data } = await client.GET('/event-group');

  return (
    <div className="flex justify-center min-h-svh my-6">
      <div className="w-full">
        <h1 className="font-extrabold text-center text-base">イベント一覧</h1>
        <div className="mt-4">
          {data ? (
            <>
              <ul className="space-y-4">
                {data.map((event) => (
                  <li key={event.id}>
                    <EventList event={event}></EventList>
                  </li>
                ))}
              </ul>
              <CreateEventDialog>
                <Plus className="fixed bottom-5 right-5 z-50 rounded-full shadow-xl p-1 w-10 h-10 bg-foreground hover:opacity-85 text-background cursor-pointer" />
              </CreateEventDialog>
            </>
          ) : (
            <NoItems
              alt="イベント"
              src="/calender.jpg"
              message="イベントがありません。"
            >
              <CreateEventDialog>
                <Button
                  variant="outline"
                  className="flex mx-auto mt-6 cursor-pointer"
                >
                  イベント作成
                </Button>
              </CreateEventDialog>
            </NoItems>
          )}
        </div>
      </div>
    </div>
  );
}
