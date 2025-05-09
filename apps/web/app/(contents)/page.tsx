import { client } from '@/openapi.config';
import { Button } from '@repo/ui/components';
import { Plus } from '@repo/ui/components/icons';
import CreateEventDialog from './components/create-event-dialog';
import EventList from './components/event-list';
import NoItems from './components/no-items';

export default async function Home() {
  const { data } = await client.GET('/event-group');

  return (
    <div className="flex justify-center min-h-svh mt-10 px-4">
      <div className="w-full">
        <h1 className="font-extrabold text-center">イベント一覧</h1>
        <div className="mt-10">
          {data ? (
            <>
              <ul className="space-y-4">
                {data.map((event) => (
                  <EventList event={event} key={event.id}></EventList>
                ))}
              </ul>
              <CreateEventDialog>
                <Plus className="fixed bottom-5 right-5 z-50 rounded-full shadow-xl p-1 w-10 h-10 bg-foreground hover:opacity-85 text-background cursor-pointer" />
              </CreateEventDialog>
            </>
          ) : (
            <NoItems
              alt="イベント"
              src="/event.png"
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
