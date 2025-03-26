'use client';
import { CheckCircle } from 'lucide-react';
import { Step } from '../types';

interface ProgressIndicatorProps {
  steps: Step[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function ProgressIndicator({ steps, activeTab, setActiveTab }: ProgressIndicatorProps) {
  // Déterminer l'index de l'étape active
  const activeIndex = steps.findIndex((step) => step.value === activeTab);

  return (
    <div className='mb-10 hidden md:block'>
      <div className='relative mx-auto flex max-w-2xl items-center'>
        {/* Barres de progression en arrière-plan */}
        <div className='absolute left-0 right-0 flex h-[2px] justify-between'>
          {steps.map((_, index) => {
            // Ne pas afficher de ligne après la dernière étape
            if (index === steps.length - 1) return null;

            const isCompleted = activeIndex > index;

            return (
              <div key={`line-${index}`} className='relative flex-1 px-8'>
                <div className='h-full w-full bg-foreground/20'></div>
                {/* Overlay de progression */}
                <div
                  className={`absolute left-0 top-0 h-full bg-primary transition-all duration-500 ease-in-out ${isCompleted ? 'w-full' : 'w-0'}`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Points d'étape */}
        {steps.map((step, index) => {
          const isActive = activeTab === step.value;
          const isCompleted = activeIndex > index;

          return (
            <div key={step.value} className='relative z-10 flex flex-1 flex-col items-center'>
              <button
                onClick={() => setActiveTab(step.value)}
                className={`group flex flex-col items-center ${isActive ? 'pointer-events-none' : 'cursor-pointer'}`}
                aria-label={`Passer à l'${step.label}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : isCompleted
                        ? 'border-primary bg-primary text-white'
                        : 'border-foreground bg-foreground text-primary group-hover:border-primary/70 group-hover:bg-primary/10'
                  }`}
                >
                  {isCompleted ? <CheckCircle className='h-6 w-6' /> : index + 1}
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-colors ${
                    isActive || isCompleted ? 'text-primary' : 'group-hover:text-primary/80'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
