import BaseLayout from '../base-layout';
import Header from './header/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout>
      <Header />
      {children}
    </BaseLayout>
  );
}
