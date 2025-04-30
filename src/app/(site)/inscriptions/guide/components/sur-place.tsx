'use client';
import { StepContentView } from './StepContentView';
import { TabNavigationSidebar } from './TabNavigationSidebar';
import { Tabs } from '@/components/ui/tabs';
import { StepOne, StepThree, Preambule, StepTwo } from './Steps';
import { useState } from 'react';

const steps = [
  {
    component: Preambule,
    label: 'Etape 0',
    value: 'step-0',
    title: 'Préambule',
    description: 'Voici les informations essentielles pour votre inscription.',
  },
  {
    component: StepOne,
    label: 'Étape 1',
    value: 'step-1',
    title: 'Rendez-vous sur place',
    description: "Donnez nous vos documents et payez votre inscription",
  },
  {
    component: StepTwo,
    label: 'Étape 2',
    value: 'step-2',
    title: 'Inscription en ligne',
    description: "Finalisez votre inscription et recevez votre confirmation d'adhésion.",
  },
  {
    component: StepThree,
    label: 'Étape 3',
    value: 'step-3',
    title: 'La licence',
    description: "Confirmation de votre inscription."
  },
];

export default function SurPlace() {
  const [activeStep, setActiveStep] = useState('step-0');
  return (
    <section className='mx-auto w-full max-w-7xl rounded-lg bg-primary/5 px-3 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10 lg:px-10'>
      <Tabs value={activeStep} onValueChange={setActiveStep} className='mx-auto w-full'>
        <div className='flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8'>
          <div className='w-full md:w-auto md:min-w-[240px] lg:min-w-[280px]'>
            <TabNavigationSidebar steps={steps} />
          </div>
          <div className='flex grow flex-col'>
            {steps.map((step) => (
              <StepContentView key={step.value} step={step} setActiveTab={setActiveStep} />
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  );
}
