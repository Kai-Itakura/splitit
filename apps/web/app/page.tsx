import { Button } from '@repo/ui/components';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm" className="text-red-400">
          Button
        </Button>
      </div>
    </div>
  );
}
