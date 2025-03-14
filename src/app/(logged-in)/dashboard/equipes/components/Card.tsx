'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Calendar, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import UpdateModal from './UpdateModal';
import Team from '@/models/Team';
import Member from '@/models/Member';
import DeleteDialog from '@/components/ui/delete-dialog';

export type PropsType = {
  data: ReturnType<Team['toPlainObject']>;
  members: ReturnType<Member['toPlainObject']>[];
};

export default function TeamCard({ data, members }: Readonly<PropsType>) {
  const handleDelete = async () => {
    fetch(`/api/teams/${data.id}`, {
      method: 'DELETE',
    });
  };

  return (
    <Card className='h-full w-full overflow-hidden font-secondary  transition-all duration-300 hover:shadow-lg text-primary '>
      <CardHeader className='relative p-0'>
        <div className='relative aspect-video w-full overflow-hidden'>
          <Image src={data.image} alt={`Photo de l'équipe ${data.name}`} fill className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
          <div className='absolute bottom-4 left-4 z-10 flex flex-col space-y-2'>
            <CardTitle className='text-3xl font-bold text-primary'>{data.name}</CardTitle>
            <Badge className='self-start bg-primary/80 text-primary'>{data.level}</Badge>
          </div>
        </div>
        <div className='absolute right-2 top-2 z-20 flex gap-2'>
          <UpdateModal members={members} data={data} />
          <DeleteDialog handleDelete={handleDelete} />
        </div>
      </CardHeader>

      <CardContent className='space-y-5 p-6'>
        {/* Informations principales */}
        <div className='grid grid-cols-2 gap-4'>
          {data.coach && (
            <div className='flex items-center gap-2 rounded-md border bg-card p-3 shadow-sm'>
              <Users className='h-4 w-4 text-primary' />
              <div className='flex flex-col'>
                <span className='text-xs text-muted-foreground'>Entraîneur</span>
                <span className='font-medium'>{data.coach.name}</span>
              </div>
            </div>
          )}

          {data.isCompetition && (
            <div className='flex items-center gap-2 rounded-md border bg-card p-3 shadow-sm'>
              <Trophy className='h-4 w-4 text-amber-500' />
              <div className='flex flex-col'>
                <span className='text-xs text-muted-foreground'>Type</span>
                <span className='font-medium'>Compétition</span>
              </div>
            </div>
          )}
        </div>

        {/* Championnats */}
        {data.championnats.length > 0 && (
          <div className='rounded-md border bg-card p-4 shadow-sm'>
            <h3 className='mb-3 font-medium'>Championnats</h3>
            <div className='flex flex-wrap gap-2'>
              {data.championnats.map((championnat) => (
                <Badge key={championnat}>{championnat}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Sessions d'entraînement - maintenant toujours visibles */}
        <div className='rounded-md border bg-card p-4 shadow-sm'>
          <h3 className='mb-3 font-medium'>Sessions d&apos;entraînement</h3>
          <div className='space-y-3'>
            {data.sessions.map((session) => (
              <div
                key={`${session.gymnase}-${session.day}-${session.start}`}
                className='flex flex-col space-y-2 rounded-md border bg-accent/5 p-3'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-primary' />
                    <span className='font-medium'>{session.day}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-primary' />
                    <span>
                      {session.start} - {session.end}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-primary' />
                  <span>{session.gymnase.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
