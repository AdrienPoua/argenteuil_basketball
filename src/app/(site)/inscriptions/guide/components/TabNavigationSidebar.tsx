'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Step } from '../types';
import Image from 'next/image';

type PropsType = {
  steps: Step[];
};

export function TabNavigationSidebar({ steps }: Readonly<PropsType>) {
  return (
    <TabsList className='flex w-full flex-row gap-2 bg-transparent p-0 md:flex-col'>
      {steps.map((step, index) => (
        <TabsTrigger
          key={step.value}
          value={step.value}
          className='flex h-auto w-full items-center justify-start gap-2 rounded-lg border-b-2 border-l-0 border-transparent bg-primary/10 p-2 text-left transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary sm:gap-3 sm:p-3 md:min-h-[90px] md:border-b-0 md:border-l-4 md:p-4 md:data-[state=active]:border-b-0 md:data-[state=active]:border-l-4'
        >
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary sm:h-7 sm:w-7 sm:text-sm md:h-8 md:w-8 md:text-base'>
            {index + 1}
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-xs font-medium sm:text-sm'>{step.label}</span>
            <span className='hidden text-xs sm:block'>{step.title}</span>
          </div>
          {step.icon && (
            <Image
              src={step.icon}
              alt={step.title}
              width={24}
              height={24}
              className='ml-auto hidden opacity-70 md:block'
            />
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
