'use client';

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Input } from '../ui/input';

const PassWordInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  const [isOpen, setIsOpen] = useState(false);

  const onIconClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <Input
        className={className}
        {...props}
        type={isOpen ? 'text' : 'password'}
      />
      <span
        onClick={onIconClick}
        className="absolute top-1/2 right-3 -translate-y-1/2"
      >
        {isOpen ? <EyeOpenIcon /> : <EyeNoneIcon />}
      </span>
    </div>
  );
};

export { PassWordInput };
