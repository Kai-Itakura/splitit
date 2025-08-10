import Header from './header/header';

const ContentsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main>
        <div className="px-4 md:px-10">{children}</div>
      </main>
    </>
  );
};

export default ContentsLayout;
