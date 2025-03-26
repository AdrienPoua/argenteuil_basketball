'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoTitle from '@/components/ui/video-title';
import { useState } from 'react';
import SurPlace from './components/sur-place';
import EnLigne from './components/en-ligne';
import { FAQSection } from './components/FAQSection';
// Composant principal
export default function InscriptionsGuidePage() {
  // État pour suivre l'onglet principal actif
  const [activeMainTab, setActiveMainTab] = useState('sur-place');

  return (
    <div className='container mx-auto'>
      <VideoTitle type='h1' video='/videos/inscriptions.mp4'>
        Guide d&apos;inscription
      </VideoTitle>

      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className='mt-8'>
        <TabsList className='mx-auto mb-8 grid w-[400px] grid-cols-2'>
          <TabsTrigger value='sur-place'>Sur place</TabsTrigger>
          <TabsTrigger value='en-ligne'>En ligne</TabsTrigger>
        </TabsList>
        {/* Onglet Guide d'inscription */}
        <TabsContent value='sur-place'>
          <SurPlace />
        </TabsContent>
        {/* Onglet Formulaire d'inscription */}
        <TabsContent value='en-ligne' className='mb-10'>
          <div> En cours de construction </div>
          {/*      <EnLigne /> */}{' '}
        </TabsContent>
      </Tabs>
      <FAQSection />
    </div>
  );
}
