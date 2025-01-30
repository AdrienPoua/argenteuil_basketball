import { ReactElement } from 'react';

const Instructions = ({ children, className }: { children: React.ReactNode; className?: string }): ReactElement => {
  return (
    <div className='relative mb-10 rounded-xl border-2 border-dashed border-primary p-10'>
      <h3 className={`absolute left-10 top-0 z-10 -translate-y-1/2 transform bg-black text-primary ${className}`}>
        Instructions
      </h3>
      <div className='flex flex-col gap-4'>{children}</div>
    </div>
  );
};

export default Instructions;
