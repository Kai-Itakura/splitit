import { get } from './util/fetch';

export default async function Home() {
  const data = await get('event-group');
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4"></div>
    </div>
  );
}
