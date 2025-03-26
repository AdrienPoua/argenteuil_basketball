'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Step } from '../types';

type PropsType = {
  steps: Step[];
};

export function TabNavigationSidebar({ steps }: Readonly<PropsType>) {
  return (
    <TabsList className='flex min-w-[300px] flex-col gap-2 bg-transparent'>
      {steps.map((step, index) => (
        <TabsTrigger
          key={step.value}
          value={step.value}
          className='flex size-full h-[100px] grow items-center justify-start gap-3 rounded-lg border-l-4 border-transparent bg-primary/10 p-4 text-left transition-all data-[state=active]:border-l-4 data-[state=active]:border-primary'
        >
          <div className='flex h-8 w-8 items-center justify-center rounded-full'>{index + 1}</div>
          <div className='flex flex-col items-start'>
            <span className='text-sm font-medium'>{step.label}</span>
            <span className='text-xs'>{step.title}</span>
          </div>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
