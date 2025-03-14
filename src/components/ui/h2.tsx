import { cn } from '@/lib/utils/cn';
import { useId } from 'react';

interface H2Props {
  children: React.ReactNode;
  className?: string;
}

export default function H2({ children, className }: Readonly<H2Props>) {
  return (
    <div className='my-12 flex w-full justify-center'>
      <h2
        className={cn(
          'relative w-fit max-w-4xl border-b-2 border-primary px-2 pb-2 cursor-pointer',
          'text-center text-3xl font-bold text-primary md:text-4xl lg:text-7xl',
          'transition-all duration-300 ease-in-out',
          'after:absolute after:bottom-[-2px] after:left-0 after:block after:content-[""]',
          'after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-500 hover:after:w-full',
          className,
        )}
      >
        {children}
      </h2>
    </div>
  );
}
