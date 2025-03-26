'use client';
import {  } from './FAQSection';
import { StepContentView } from './StepContentView';
import { TabNavigationSidebar } from './TabNavigationSidebar';
import { Tabs } from '@/components/ui/tabs';
import { StepOne, StepTwo, StepThree } from './Steps';
import { useState } from 'react';

const steps = [
  {
    component: StepOne,
    label: 'Étape 1',
    value: 'step-1',
    title: 'Les documents',
    icon: '/icons/document-icon.svg',
    description: 'Découvrez les documents nécessaires et informations essentielles pour votre inscription.',
  },
  {
    component: StepTwo,
    label: 'Étape 2',
    value: 'step-2',
    title: 'Inscription en ligne',
    icon: '/icons/payment-icon.svg',
    description: "Remplissez le formulaire d'inscription en ligne",
  },
  {
    component: StepThree,
    label: 'Étape 3',
    value: 'step-3',
    title: 'Validation',
    icon: '/icons/check-icon.svg',
    description: "Finalisez votre inscription et recevez votre confirmation d'adhésion.",
  },
];

export default function SurPlace() {
  const [activeStep, setActiveStep] = useState('step-1');
  return (
    <>
      <section className='py-10 bg-primary/5 w-fit rounded-lg px-10 mx-auto'>
        <Tabs value={activeStep} onValueChange={setActiveStep} className='mx-auto w-fit'>
          <div className='flex gap-2'>
            <TabNavigationSidebar steps={steps} />
            <div className='flex grow flex-col'>
              {steps.map((step) => (
                <StepContentView key={step.value} step={step} setActiveTab={setActiveStep} />
              ))}
            </div>
          </div>
        </Tabs>
      </section>
    </>
  );
}
