'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import UpdateModal from './UpdateModal';
import Team from '@/models/Team';
import Member from '@/models/Member';
import DeleteDialog from '@/components/ui/delete-dialog';

export type PropsType = {
  data: ReturnType<Team['toPlainObject']>;
  members: ReturnType<Member['toPlainObject']>[];
};

export default function TeamCard({ data, members }: Readonly<PropsType>) {
  const [isSessionsExpanded, setIsSessionsExpanded] = useState(false);

  const handleDelete = async () => {
    fetch(`/api/teams/${data.id}`, {
      method: 'DELETE',
    });
  };

  return (
    <Card className='size-full font-secondary text-muted-foreground transition-all duration-300 hover:shadow-lg'>
      <CardHeader className='relative p-0'>
        <div className='relative aspect-video w-full overflow-hidden rounded-t-md'>
          <Image
            src={data.image}
            alt={`Photo de l'équipe ${data.name}`}
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
          <CardTitle className='absolute bottom-4 left-4 z-10 text-3xl font-bold text-white'>{data.name}</CardTitle>
        </div>
        <div className='absolute right-2 top-2 z-20 flex gap-2'>
          <UpdateModal members={members} data={data} />
          <DeleteDialog handleDelete={handleDelete} />
        </div>
      </CardHeader>
      <CardContent className='space-y-6 p-6'>
        {data.coach && (
          <div className='flex items-center gap-3 rounded-md bg-primary/10 p-3'>
            <Badge variant='secondary'>Entraineur</Badge>
            <Badge>{data.coach.name}</Badge>
          </div>
        )}
        {data.championnats.length > 0 && (
          <div className='flex flex-wrap items-center gap-2 rounded-md bg-secondary/10 p-3'>
            <Badge variant='secondary'>Championnats</Badge>
            <div className='flex flex-wrap gap-2'>
              {data.championnats.map((championnat) => (
                <Badge key={championnat} className='text-xs'>
                  {championnat}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className='space-y-2'>
          <Button onClick={() => setIsSessionsExpanded(!isSessionsExpanded)} className='w-full justify-between'>
            Sessions d&apos;entraînement
            {isSessionsExpanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
          </Button>
          {isSessionsExpanded &&
            data.sessions.map((session, index) => (
              <div
                key={`${session.gymnase}-${session.day}-${session.start}-${session.end}`}
                className='flex flex-col gap-2 rounded-md bg-accent/10 p-3'
              >
                <div className='flex flex-row items-center justify-between'>
                  <Badge className='text-xs'>{session.day}</Badge>
                  <Badge className='text-xs'>{session.gymnase.replace('_', ' ')}</Badge>
                  <div className='flex items-center text-sm'>
                    <Badge className='text-xs'>
                      <Clock className='mr-1.5 h-4 w-4' />
                      {session.start} - {session.end}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
