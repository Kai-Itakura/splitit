import { getAllGroups } from './api-client';

export default async function Home() {
  const result = await getAllGroups({ method: 'GET' });
  console.log('🔥 ~ Home ~ result:', result);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4"></div>
    </div>
  );
}
