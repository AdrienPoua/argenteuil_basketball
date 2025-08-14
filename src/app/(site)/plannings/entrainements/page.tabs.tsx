'use client'

import { Calendar, Clock } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TeamType } from './page'
import VueDaily from './page.daily'
import VueHoraire from './page.horaire'

type PropsType = {
  teams: TeamType[]
}

export default function Component({ teams }: Readonly<PropsType>) {
  const [activeTab, setActiveTab] = useState('horaire')

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 gap-1 sm:gap-3" defaultValue="horaire">
          <TabsTrigger value="horaire" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Vue horaire</span>
            <span className="sm:hidden">Horaire</span>
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Vue par jour</span>
            <span className="sm:hidden">Par jour</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="horaire" className="space-y-4">
          <VueHoraire teams={teams} />
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <VueDaily teams={teams} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
