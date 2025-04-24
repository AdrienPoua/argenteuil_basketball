import { cn } from '@/lib/utils/cn';

interface H2Props {
  children: React.ReactNode;
  className?: string;
  anchor?: string;
}

export default function H2({ children, className, anchor }: Readonly<H2Props>) {
  return (
    <div className='my-12 flex w-full justify-center'>
      <h2
        className={cn(
          'relative w-fit max-w-4xl cursor-pointer border-b-2 border-primary px-2 pb-2',
          'text-center text-3xl font-bold text-primary md:text-4xl lg:text-7xl',
          'transition-all duration-300 ease-in-out',
          'after:absolute after:bottom-[-2px] after:left-0 after:block after:content-[""]',
          'after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-500 hover:after:w-full',
          className,
        )}
        id={anchor}
      >
        {children}
      </h2>
    </div>
  );
}
