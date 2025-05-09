import React from 'react';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <div className=" px-6">{children}</div>
    </main>
  );
};

export default AuthLayout;
