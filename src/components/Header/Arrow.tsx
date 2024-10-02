import React, { ReactElement } from 'react';
import { Triangle } from 'lucide-react';

type PropsType = {
  className?: string;
  open?: boolean;
};

export default function Arrow({ open, className }: Readonly<PropsType>): ReactElement {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Triangle
        strokeWidth={0.1}
        className={`${open ? 'rotate-180 text-primary' : 'rotate-90'} transition-transform duration-300 ease-in-out text-black fill-current`}
        size={15}
      />
    </div>
  );
}
