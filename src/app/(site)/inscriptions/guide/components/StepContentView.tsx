'use client'
import { TabsContent } from '@/components/ui/tabs'
import type { Step as StepType } from '../types'

interface StepContentViewProps {
  step: StepType
  setActiveTab: (value: string) => void
}

export function StepContentView({ step }: Readonly<StepContentViewProps>) {
  return (
    <TabsContent key={step.value} value={step.value} className="mt-0 h-full w-full pt-1">
      <div className="h-full rounded-xl border p-3 shadow-sm sm:p-4 md:p-6">
        <div className="mb-4 hidden md:block">
          <h2 className="text-xl font-bold text-primary md:text-2xl">{step.title}</h2>
        </div>
        <div className="w-full font-secondary">{step.component()}</div>
      </div>
    </TabsContent>
  )
}
