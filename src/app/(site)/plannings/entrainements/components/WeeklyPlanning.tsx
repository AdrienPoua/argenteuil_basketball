'use client';

import { useState, useMemo } from 'react';
import { ShoppingBasketIcon as Basketball, MapPin, Trophy, Calendar, Sun, Sunset, Moon, Building } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
type Coach = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type Session = {
  day: string;
  start: string;
  end: string;
  gymnase: string;
};

type Team = {
  id: string;
  name: string;
  image: string;
  coach?: Coach;
  sessions: Session[];
  isCompetition: boolean;
};

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

type TeamSession = {
  teamName: string;
  coachName: string;
  start: string;
  end: string;
  isCompetition: boolean;
};

// Constants
const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const GYMNASES = ['Jean Guimier', 'Jesse Owens'];

const getTimeOfDay = (time: string): TimeOfDay => {
  const hour = parseInt(time.split(':')[0]);
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

const getTimeOfDayIcon = (timeOfDay: TimeOfDay) => {
  switch (timeOfDay) {
    case 'morning':
      return <Sun className='h-4 w-4 text-yellow-500' />;
    case 'afternoon':
      return <Sunset className='h-4 w-4 text-orange-500' />;
    case 'evening':
      return <Moon className='h-4 w-4 text-blue-500' />;
  }
};

const getTimeOfDayLabel = (timeOfDay: TimeOfDay) => {
  switch (timeOfDay) {
    case 'morning':
      return 'Matin';
    case 'afternoon':
      return 'Après-midi';
    case 'evening':
      return 'Soir';
  }
};

export default function TrainingSchedule({ teams }: { teams: Team[] }) {
  const [view, setView] = useState<'day' | 'team'>('day');

  // Organize sessions by day and gymnase
  const teamsByDay = useMemo(() => {
    const organized: Record<string, Record<string, Record<TimeOfDay, TeamSession[]>>> = {};

    DAYS.forEach((day) => {
      organized[day] = {};
      GYMNASES.forEach((gymnase) => {
        organized[day][gymnase] = {
          morning: [],
          afternoon: [],
          evening: [],
        };
      });
    });

    teams.forEach((team) => {
      team.sessions.forEach((session) => {
        const timeOfDay = getTimeOfDay(session.start);

        if (organized[session.day] && organized[session.day][session.gymnase]) {
          organized[session.day][session.gymnase][timeOfDay].push({
            teamName: team.name,
            coachName: team.coach?.name ?? '',
            start: session.start,
            end: session.end,
            isCompetition: team.isCompetition,
          });
        }
      });
    });

    // Sort sessions by start time
    DAYS.forEach((day) => {
      GYMNASES.forEach((gymnase) => {
        (['morning', 'afternoon', 'evening'] as TimeOfDay[]).forEach((timeOfDay) => {
          organized[day][gymnase][timeOfDay].sort((a, b) => a.start.localeCompare(b.start));
        });
      });
    });

    return organized;
  }, [teams]);

  // Group teams by name for team view
  const teamsByName = useMemo(() => {
    return teams.reduce(
      (acc, team) => {
        acc[team.name] = {
          coach: team.coach?.name ?? '',
          isCompetition: team.isCompetition,
          sessions: team.sessions.map((session) => ({
            day: session.day,
            start: session.start,
            end: session.end,
            gymnase: session.gymnase,
          })),
        };
        return acc;
      },
      {} as Record<string, { coach: string; isCompetition: boolean; sessions: Session[] }>,
    );
  }, [teams]);

  const stats = useMemo(() => {
    const totalSessions = teams.reduce((sum, team) => sum + team.sessions.length, 0);
    const competitionTeams = teams.filter((team) => team.isCompetition).length;
    const totalTeams = teams.length;

    return { totalSessions, competitionTeams, totalTeams };
  }, [teams]);

  return (
    <div className='mx-auto w-full max-w-[210mm] bg-white text-black print:m-0 print:max-w-none'>
      {/* Compact Header optimized for A4 */}
      <div className='mb-4 border-b-2 border-orange-500 pb-3 print:mb-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Basketball className='h-6 w-6 text-orange-600' />
            <div>
              <h1 className='text-lg font-bold text-gray-900 print:text-base'>Argenteuil Basketball</h1>
              <p className='text-sm text-gray-600 print:text-xs'>Planning d&apos;Entraînement 2024-2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Day view - Optimized for A4 printing */}
      {view === 'day' && (
        <div className='grid grid-cols-2 gap-3 print:gap-2 print:text-[11px]'>
          {DAYS.map((day) => {
            const hasSessionsForDay = GYMNASES.some((gymnase) =>
              (['morning', 'afternoon', 'evening'] as TimeOfDay[]).some(
                (timeOfDay) => teamsByDay[day][gymnase][timeOfDay].length > 0,
              ),
            );

            if (!hasSessionsForDay) return null;

            return (
              <div key={day} className='rounded border border-gray-300 print:break-inside-avoid'>
                <div className='bg-orange-500 p-2 text-center text-sm font-bold text-white print:p-1 print:text-xs'>
                  {day}
                </div>
                <div className='p-3 print:p-2'>
                  {GYMNASES.map((gymnase) => {
                    const hasSessionsForGymnase = (['morning', 'afternoon', 'evening'] as TimeOfDay[]).some(
                      (timeOfDay) => teamsByDay[day][gymnase][timeOfDay].length > 0,
                    );

                    if (!hasSessionsForGymnase) return null;

                    return (
                      <div key={gymnase} className='mb-3 last:mb-0 print:mb-2'>
                        <div className='mb-2 flex items-center gap-1 print:mb-1'>
                          <Building className='h-3 w-3 text-gray-500 print:h-2 print:w-2' />
                          <h3 className='text-xs font-semibold text-gray-800 print:text-[10px]'>{gymnase}</h3>
                        </div>

                        {(['morning', 'afternoon', 'evening'] as TimeOfDay[]).map((timeOfDay) => {
                          const sessions = teamsByDay[day][gymnase][timeOfDay];
                          if (sessions.length === 0) return null;

                          return (
                            <div key={timeOfDay} className='mb-2 last:mb-0 print:mb-1'>
                              <div className='mb-1 flex items-center gap-1'>
                                {getTimeOfDayIcon(timeOfDay)}
                                <span className='text-xs font-medium text-gray-600 print:text-[9px]'>
                                  {getTimeOfDayLabel(timeOfDay)}
                                </span>
                              </div>

                              <div className='ml-4 space-y-1 print:ml-3 print:space-y-0'>
                                {sessions.map((session, idx) => (
                                  <div
                                    key={idx}
                                    className={`rounded border-l-2 p-2 text-xs print:p-1 print:text-[9px] ${
                                      session.isCompetition
                                        ? 'border-l-orange-500 bg-orange-50'
                                        : 'border-l-gray-300 bg-gray-50'
                                    }`}
                                  >
                                    <div className='flex items-start justify-between'>
                                      <div className='flex items-center gap-1'>
                                        <span className='font-medium text-gray-900'>{session.teamName}</span>
                                        {session.isCompetition && (
                                          <Trophy className='h-3 w-3 text-orange-500 print:h-2 print:w-2' />
                                        )}
                                      </div>
                                      <span className='font-mono text-xs print:text-[8px]'>
                                        {session.start}-{session.end}
                                      </span>
                                    </div>
                                    <div className='mt-1 text-xs text-gray-600 print:text-[8px]'>
                                      {session.coachName}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compact Footer for A4 */}
      <div className='mt-6 border-t-2 border-orange-500 pt-4 print:mt-4 print:pt-2'>
        <div className='space-y-2 text-center text-xs text-gray-600 print:space-y-1 print:text-[9px]'>
          <div className='flex items-center justify-center gap-6 print:gap-4'>
            <div className='flex items-center gap-1'>
              <MapPin className='h-3 w-3 print:h-2 print:w-2' />
              <span>Jean Guimier : 2 rue jean de la fontaine</span>
            </div>
            <div className='flex items-center gap-1'>
              <MapPin className='h-3 w-3 print:h-2 print:w-2' />
              <span>Jesse Owens : 120 rue de rochefort</span>
            </div>
          </div>
          <div className='flex items-center justify-center gap-4 print:gap-2'>
            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded-full bg-orange-500'></div>
              <span>Équipe en compétition</span>
            </div>
            <div className='flex items-center gap-1'>
              <Trophy className='h-3 w-3 text-orange-500 print:h-2 print:w-2' />
              <span>Compétition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
