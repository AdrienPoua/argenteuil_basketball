'use client';
import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import SurPlace from './sur-place';

export default function Tabs() {
  const [activeMainTab, setActiveMainTab] = useState('sur-place');
  return (
    <TabsComponent value={activeMainTab} onValueChange={setActiveMainTab} className='mt-8'>
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
    </TabsComponent>
  );
}
