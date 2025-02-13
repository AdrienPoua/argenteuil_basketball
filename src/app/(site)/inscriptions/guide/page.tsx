import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StepOne, StepTwo, StepThree } from './Steps';
import VideoTitle from '@/components/ui/video-title';

export const metadata = {
  title: 'Inscriptions | Argenteuil Basketball',
  description: "Découvrez les étapes pour vous inscrire au club de basket d'Argenteuil.",
  openGraph: {
    title: 'Inscriptions - Argenteuil Basketball',
    description: "Toutes les infos sur les étapes pour vous inscrire au club de basket d'Argenteuil.",
  },
};

const steps = [
  { component: StepOne, label: 'Étape 1', value: 'step-1' },
  { component: StepTwo, label: 'Étape 2', value: 'step-2' },
  { component: StepThree, label: 'Étape 3', value: 'step-3' },
];

export default function DynamicHero() {
  return (
    <section>
      <div className='container mx-auto px-4 md:px-6'>
        <VideoTitle type='h1' video='/videos/inscriptions.mp4'>
          Inscriptions
        </VideoTitle>
        <Tabs defaultValue='step-1'>
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
