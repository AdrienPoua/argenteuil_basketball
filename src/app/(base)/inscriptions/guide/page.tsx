'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StepOne, StepTwo, StepThree } from './Steps';

const steps = [
  { component: StepOne, label: 'Étape 1', value: 'step-1' },
  { component: StepTwo, label: 'Étape 2', value: 'step-2' },
  { component: StepThree, label: 'Étape 3', value: 'step-3' },
];

export default function DynamicHero() {
  return (
    <section>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>Inscriptions</h1>
          <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
            Suivez les étapes ci-dessous pour finaliser votre inscription.
          </p>
        </div>
        <Tabs defaultValue='step-1' className='mt-8'>
          <TabsList className='mx-auto mb-20 grid w-fit grid-cols-3'>
            {steps.map((step) => (
              <TabsTrigger key={step.value} value={step.value} className='md:w-52'>
                {step.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {steps.map((step) => (
            <TabsContent key={step.value} value={step.value}>
              {step.component()}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
