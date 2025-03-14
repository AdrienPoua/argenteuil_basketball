'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StepOne, StepTwo, StepThree } from './Steps';
import VideoTitle from '@/components/ui/video-title';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import H2 from '@/components/ui/h2';
import Link from 'next/link';
import { useState } from 'react';

// Types
type Step = {
  component: () => JSX.Element;
  label: string;
  value: string;
  title: string;
  icon: string;
  description: string;
};

// Données
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

// FAQ items
const faqItems = [
  {
    question: 'Le certificat médical est-il obligatoire ?',
    answer: [
      'Non pour les mineurs',
      'Oui pour les majeurs (valable 3 ans)',
      "La mention 'basketball en compétition' est indispensable pour que le certificat soit valable.",
      'Un certificat médical vierge est disponible sur le site dans la page documents. (recommandé)',
    ],
  },
  {
    question: "Je n'ai pas reçu d'email pour l'inscription informatique, que faire ?",
    answer: ['Contactez-nous par email', 'Donnez nous les informations suivantes : nom, prénom, date de naissance'],
  },
  {
    question: "Puis-je m'inscrire en cours d'année ?",
    answer: [
      "Oui, les inscriptions restent possibles tout au long de l'année.",
      "Une réduction proportionnelle peut être appliquée selon la période d'inscription.",
    ],
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: [
      "Chèque à l'ordre d'Argenteuil Basketball.",
      'Espèces',
      "Possibilité de paiement en plusieurs fois (jusqu'à 3 échéances).",
    ],
  },
];

// Composant principal
export default function InscriptionsGuidePage() {
  // État pour suivre l'étape active
  const [activeTab, setActiveTab] = useState('step-1');

  return (
    <div className='container mx-auto'>
      <VideoTitle type='h1' video='/videos/inscriptions.mp4'>
        Guide d&apos;inscription
      </VideoTitle>
      <IntroductionSection steps={steps} activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className='py-12'>
        <div className='container mx-auto px-4 md:px-6'>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className='flex flex-col md:flex-row md:gap-12'>
              <TabNavigationSidebar steps={steps} />
              <div className='flex grow flex-col'>
                {steps.map((step) => (
                  <StepContentView key={step.value} step={step} setActiveTab={setActiveTab} />
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <FAQSection items={faqItems} />
    </div>
  );
}

// Composant pour l'indicateur de progression
const ProgressIndicator = ({
  steps,
  activeTab,
  setActiveTab,
}: {
  steps: Step[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}) => {
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
};

// Composant pour la section d'introduction
const IntroductionSection = ({
  steps,
  activeTab,
  setActiveTab,
}: {
  steps: Step[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}) => (
  <section className='pb-12'>
    <div className='container mx-auto px-4 md:px-6'>
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='mb-4 text-3xl font-bold md:text-4xl'>Rejoignez notre club en 3 étapes</h2>
        <p className='mb-8 text-lg'>Suivez ces trois étapes pour compléter votre inscription.</p>

        <ProgressIndicator steps={steps} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  </section>
);

// Composant pour la barre de navigation latérale des onglets
const TabNavigationSidebar = ({ steps }: { steps: Step[] }) => (
  <TabsList className='flex flex-col gap-2 bg-transparent'>
    {steps.map((step, index) => (
      <TabsTrigger
        key={step.value}
        value={step.value}
        className='flex w-full items-center justify-start gap-3 rounded-lg border-l-4 border-transparent bg-primary/10 p-4 text-left transition-all data-[state=active]:border-l-4 data-[state=active]:border-primary'
      >
        <div className='flex h-8 w-8 items-center justify-center rounded-full text-primary'>{index + 1}</div>
        <div className='flex flex-col items-start'>
          <span className='text-sm font-medium'>{step.label}</span>
          <span className='text-xs'>{step.title}</span>
        </div>
      </TabsTrigger>
    ))}
  </TabsList>
);

// Composant pour le contenu de l'étape
const StepContentView = ({ step, setActiveTab }: { step: Step; setActiveTab: (value: string) => void }) => (
  <TabsContent key={step.value} value={step.value} className='mt-0 pt-1'>
    <div></div>
    <div className='rounded-xl border p-6'>{step.component()}</div>
  </TabsContent>
);

// Composant pour la section FAQ
const FAQSection = ({ items }: { items: { question: string; answer: string[] }[] }) => (
  <section className='py-16'>
    <div className='container mx-auto px-4 md:px-6'>
      <H2 className='mb-12'>Questions fréquentes</H2>

      <div className='mx-auto grid max-w-4xl gap-6 md:grid-cols-2'>
        {items.map((item, index) => (
          <div
            key={item.question.slice(0, 5) + index}
            className='cursor-pointer rounded-lg border-2 border-primary p-6 shadow-sm transition-shadow hover:bg-primary/10 hover:shadow-md'
          >
            <h3 className='mb-3 bg-primary/10 text-center text-lg font-semibold text-primary'>{item.question}</h3>
            <ul className='list-disc space-y-2 pl-5'>
              {item.answer.map((point, pointIndex) => (
                <li key={pointIndex + item.question.slice(0, 5)} className='font-secondary'>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='mt-12 text-center'>
        <Button asChild variant='outline' size='lg'>
          <Link href='/faq'>
            Voir toutes les questions <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
