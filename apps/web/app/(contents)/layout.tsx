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
        <div className=" px-6">{children}</div>
      </main>
    </>
  );
};

export default ContentsLayout;
