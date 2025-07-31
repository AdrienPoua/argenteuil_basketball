'use client'

import { Calendar, Clock } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  allSessionsType,
  daysType,
  gymnaseMapType,
  GymnaseType,
  sessionsByDayAndTimeType,
  sessionsByDayType,
  TeamType,
  timeSlotsType,
} from './page'
import CardsView from './page.card'
import TimelineView from './page.timeline'

type PropsType = {
  teams: TeamType[]
  gymnases: GymnaseType[]
  sessionsByDay: sessionsByDayType
  sessionsByDayAndTime: sessionsByDayAndTimeType
  allSessions: allSessionsType
  gymnaseMap: gymnaseMapType
  timeSlots: timeSlotsType
  days: daysType
}

export default function Component({
  teams,
  days,
  gymnases,
  sessionsByDay,
  sessionsByDayAndTime,
  gymnaseMap,
  timeSlots,
}: Readonly<PropsType>) {
  const [activeTab, setActiveTab] = useState('cards')

  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 gap-3">
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Vue horaire
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Vue par jour
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <TimelineView
            sessionsByDayAndTime={sessionsByDayAndTime}
            timeSlots={timeSlots}
            days={days}
            gymnaseMap={gymnaseMap}
          />
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <CardsView
            sessionsByDay={sessionsByDay}
            days={days}
            gymnaseMap={gymnaseMap}
            teams={teams}
            gymnases={gymnases}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
