'use client'
import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import EnLigne from './en-ligne'
import SurPlace from './sur-place'

export default function Tabs() {
  const [activeMainTab, setActiveMainTab] = useState('sur-place')
  return (
    <TabsComponent value={activeMainTab} onValueChange={setActiveMainTab} className="mt-8">
      <TabsList className="mx-auto mb-8 grid max-w-xl grid-cols-2">
        <TabsTrigger value="sur-place">Sur place</TabsTrigger>
        <TabsTrigger value="en-ligne">En ligne</TabsTrigger>
      </TabsList>
      {/* Onglet Guide d'inscription */}
      <TabsContent value="sur-place">
        <SurPlace />
      </TabsContent>
      <TabsContent value="en-ligne" className="mb-10">
        <EnLigne />
      </TabsContent>
    </TabsComponent>
  )
}
