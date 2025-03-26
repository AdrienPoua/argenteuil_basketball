'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Step } from '../types';
import Image from 'next/image';

type PropsType = {
  steps: Step[];
};

export function TabNavigationSidebar({ steps }: Readonly<PropsType>) {
  return (
    <TabsList className='flex w-full flex-row md:flex-col gap-2 bg-transparent p-0'>
      {steps.map((step, index) => (
        <TabsTrigger
          key={step.value}
          value={step.value}
          className='flex w-full items-center justify-start gap-2 sm:gap-3 rounded-lg border-l-0 border-b-2 md:border-b-0 md:border-l-4 border-transparent bg-primary/10 p-2 sm:p-3 md:p-4 text-left transition-all data-[state=active]:border-b-2 md:data-[state=active]:border-b-0 data-[state=active]:border-primary md:data-[state=active]:border-l-4 h-auto md:min-h-[90px]'
        >
          <div className='flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary/20 text-xs sm:text-sm md:text-base text-primary font-medium'>
            {index + 1}
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-xs sm:text-sm font-medium'>{step.label}</span>
            <span className='hidden sm:block text-xs'>{step.title}</span>
          </div>
          {step.icon && (
            <Image 
              src={step.icon} 
              alt={step.title} 
              width={24} 
              height={24} 
              className='ml-auto hidden md:block opacity-70'
            />
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
