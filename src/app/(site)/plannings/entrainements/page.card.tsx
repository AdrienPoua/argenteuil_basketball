'use client';

import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import PatternCardRound from '@/components/decorative/pattern-card-round';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/core/shared/utils/cn';
import { daysType, gymnaseMapType, GymnaseType, sessionsByDayType, SessionWithTeamInfo, TeamType } from './page';

type PropsType = {
  teams: TeamType[];
  gymnases: GymnaseType[];
  sessionsByDay: sessionsByDayType;
  days: daysType;
  gymnaseMap: gymnaseMapType;
};

export default function CardsView({ sessionsByDay, days, gymnaseMap }: Readonly<PropsType>) {
  return (
    <div className='w-full space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-primary'>
            <Calendar className='h-5 w-5' />
            Planning des Entraînements - Vue par jour
          </CardTitle>
          <CardDescription>Sessions organisées par jour avec détails complets</CardDescription>
        </CardHeader>
      </Card>

      {days.map((day) => {
        const sessionsByDays = sessionsByDay[day] as SessionWithTeamInfo[];
        return (
          <Card key={day}>
            <CardHeader className='pb-3'>
              <CardTitle className='flex items-center justify-between text-lg'>
                <span>{day}</span>
                <Badge variant='outline'>{sessionsByDay[day]?.length} entrainement(s)</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sessionsByDays?.length > 0 ? (
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {sessionsByDays?.map((session) => (
                    <Card
                      key={session.id}
                      className={cn(
                        'relative overflow-hidden border-l-4 transition-transform duration-200 hover:scale-105 hover:shadow-md',
                      )}
                    >
                      <PatternCardRound topRight />
                      <CardContent className='p-4'>
                        <div className='space-y-3'>
                          {/* En-tête avec catégorie et genre */}
                          <div className='flex items-center gap-3'>
                            <Badge>{session.category.join(' & ')}</Badge>
                            <Badge variant='secondary'>{session.level}</Badge>
                          </div>

                          {/* Nom de l'équipe */}
                          <div className='text-lg font-semibold'>{session.team}</div>

                          {/* Horaires */}
                          <div className='flex items-center gap-2 text-muted-foreground'>
                            <Clock className='h-4 w-4' />
                            <span>
                              {session.start} - {session.end}
                            </span>
                          </div>

                          {/* Gymnase */}
                          <div className='flex items-center gap-2 text-muted-foreground'>
                            <MapPin className='h-4 w-4' />
                            <span className='text-sm'>{gymnaseMap[session.gymnase_id] ?? 'Gymnase inconnu'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className='py-8 text-center text-muted-foreground'>
                  <Users className='mx-auto mb-2 h-12 w-12 opacity-50' />
                  <p>Aucun entraînement programmé</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
