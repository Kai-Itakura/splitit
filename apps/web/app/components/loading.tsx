import Image from 'next/image';
import { JSX } from 'react';
import { createPortal } from 'react-dom';

const Loading = (): JSX.Element => {
  return createPortal(
    <div className="fixed inset-0 z-[9999999] top-0 left-0 flex items-center justify-center size-full bg-black opacity-55 pointer-events-auto">
      <Image
        src="/loading.png"
        width={96}
        height={96}
        alt="loading"
        className="animate-spin"
        priority
      />
    </div>,
    document.body,
  );
};

export default Loading;
