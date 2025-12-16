import React from 'react';

type WelcomeMailTemplateProps = {
  userName: string;
};

export default function WelcomeMail({
  userName,
}: WelcomeMailTemplateProps): React.JSX.Element {
  return (
    <>
      <p>
        Hi, {userName}!<br />
        Welcome to SplitIt!!
      </p>
    </>
  );
}
