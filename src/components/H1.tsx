import React, { ReactElement } from 'react';

type PropsType = {
  children: React.ReactNode;
};
export default function Index({ children }: Readonly<PropsType>): ReactElement {
  return (
    <div className="mx-auto mb-10 flex max-w-[80%] items-center justify-center overflow-hidden bg-[url('/images/background.jpg')] py-5">
      <h1 className='text-center text-3xl text-white md:text-5xl'>{children}</h1>
    </div>
  );
}
