'use client';
import { TabsContent } from '@/components/ui/tabs';
import type { Step as StepType } from '../types';

interface StepContentViewProps {
  step: StepType;
  setActiveTab: (value: string) => void;
}

export function StepContentView({ step }: Readonly<StepContentViewProps>) {
  return (
    <TabsContent key={step.value} value={step.value} className='mt-0 w-[800px] pt-1'>
      <div className='rounded-xl border p-6'>{step.component()}</div>
    </TabsContent>
  );
}
