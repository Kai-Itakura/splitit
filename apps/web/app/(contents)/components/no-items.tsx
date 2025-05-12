import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

const NoItems = ({
  children,
  alt,
  src,
  message,
}: Readonly<{
  children: React.ReactNode;
  alt: string;
  src: string | StaticImport;
  message: string;
}>) => {
  return (
    <>
      <Image
        alt={alt}
        src={src}
        width={250}
        height={250}
        className="shadow-2xl rounded-full w-64 h-64 object-contain mx-auto mb-8"
      />
      <p className="text-center text-lg">{message}</p>
      {children}
    </>
  );
};

export default NoItems;
