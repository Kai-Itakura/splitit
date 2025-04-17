import { client } from '@/openapi.config';

export default async function Home() {
  const result = await client.POST('/auth/refresh');
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4"></div>
    </div>
  );
}
