"use client"

import { Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { daysType, gymnaseMapType, sessionsByDayAndTimeType, SessionWithTeamInfo, timeSlotsType } from "./page"

type PropsType = {
  sessionsByDayAndTime: sessionsByDayAndTimeType
  timeSlots: timeSlotsType
  days: daysType
  gymnaseMap: gymnaseMapType
}

export default function TimelineView({ sessionsByDayAndTime, timeSlots, days, gymnaseMap }: Readonly<PropsType>) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Planning horaire
        </CardTitle>
        <CardDescription>Timeline détaillée des créneaux d&apos;entraînement par heure</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Vue Desktop - Grille complète */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* En-têtes des jours */}
              <div className="mb-2 grid grid-cols-8 gap-1">
                <div className="bg-primary/10 rounded p-2 text-center text-sm font-medium">Heure</div>
                {days.map((day) => (
                  <div key={day} className="bg-primary/10 rounded p-2 text-center text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille horaire */}
              {timeSlots.map((time) => (
                <div key={time} className="mb-1 grid grid-cols-8 gap-1">
                  <div className="bg-primary/10 rounded p-2 text-center text-sm font-medium">{time}</div>
                  {days.map((day) => (
                    <div key={`${day}-${time}`} className="min-h-[60px] p-1">
                      {sessionsByDayAndTime[day]?.[time]?.map((session, index) => (
                        <Slot
                          key={`${day}-${time}-${index}`}
                          time={time}
                          day={day}
                          session={session}
                          gymnaseMap={gymnaseMap}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vue Tablet - Grille adaptée */}
        <div className="hidden md:block lg:hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* En-têtes des jours */}
              <div className="mb-2 grid grid-cols-8 gap-1">
                <div className="bg-primary/10 rounded p-1.5 text-center text-xs font-medium">Heure</div>
                {days.map((day) => (
                  <div key={day} className="bg-primary/10 rounded p-1.5 text-center text-xs font-medium">
                    {day.substring(0, 3)}
                  </div>
                ))}
              </div>

              {/* Grille horaire */}
              {timeSlots.map((time) => (
                <div key={time} className="mb-1 grid grid-cols-8 gap-1">
                  <div className="bg-primary/10 rounded p-1.5 text-center text-xs font-medium">{time}</div>
                  {days.map((day) => (
                    <div key={`${day}-${time}`} className="min-h-[50px] p-0.5">
                      {sessionsByDayAndTime[day]?.[time]?.map((session, index) => (
                        <Slot
                          key={`${day}-${time}-${index}`}
                          time={time}
                          day={day}
                          session={session}
                          gymnaseMap={gymnaseMap}
                          isCompact={true}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vue Mobile - Liste verticale par jour */}
        <div className="block md:hidden">
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="border-border/50 rounded-lg border p-3">
                <h3 className="text-primary mb-3 text-sm font-semibold">{day}</h3>
                <div className="space-y-2">
                  {timeSlots.map((time) => {
                    const sessions = sessionsByDayAndTime[day]?.[time]
                    if (!sessions || sessions.length === 0) return null

                    return (
                      <div key={time} className="border-border/30 rounded border p-2">
                        <div className="text-muted-foreground mb-2 text-xs font-medium">{time}</div>
                        <div className="space-y-1">
                          {sessions.map((session, index) => (
                            <MobileSlot key={`${day}-${time}-${index}`} session={session} gymnaseMap={gymnaseMap} />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const Slot = ({
  time,
  day,
  session,
  gymnaseMap,
  isCompact = false,
}: {
  time: string
  day: string
  session: SessionWithTeamInfo
  gymnaseMap: gymnaseMapType
  isCompact?: boolean
}) => {
  return (
    <div
      key={time.toString() + day.toString()}
      className={`border-secondary text-primary bg-primary/10 mb-1 rounded border-l-4 transition-transform duration-200 hover:scale-105 ${
        isCompact ? "p-1 text-xs" : "p-2 text-xs"
      }`}
    >
      <div className="truncate font-medium">{session.team}</div>
      <div className="text-xs opacity-75">
        {session.start}-{session.end} - {gymnaseMap[session.gymnase_id]}
      </div>
    </div>
  )
}

const MobileSlot = ({ session, gymnaseMap }: { session: SessionWithTeamInfo; gymnaseMap: gymnaseMapType }) => {
  return (
    <div className="border-secondary text-primary bg-primary/10 rounded border-l-4 p-2 text-xs transition-transform duration-200 hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="truncate font-medium">{session.team}</div>
        <div className="ml-2 text-xs opacity-75">
          {session.start}-{session.end}
        </div>
      </div>
      <div className="mt-1 text-xs opacity-75">{gymnaseMap[session.gymnase_id]}</div>
    </div>
  )
}
