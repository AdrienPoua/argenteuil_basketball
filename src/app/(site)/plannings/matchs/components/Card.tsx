'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon, ClockIcon, HomeIcon, PlaneIcon } from 'lucide-react';
import Image from 'next/image';
import Match from '@/models/Match';

type PropsType = { match: ReturnType<Match['toPlainObject']> };

export default function BasketMatchCard({ match }: Readonly<PropsType>) {
  const isDefaultMatch = match.heure === '00:00';
  return (
    <Card
      className={`mx-auto size-full p-3 text-black ${match.isHome ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-green-500'} relative overflow-hidden`}
    >
      {match.remise && (
        <Image
          src='/images/divers/report.png'
          alt='Remise'
          className='left-50 absolute bottom-0 transform object-cover'
          width={1000}
          height={1000}
        />
      )}
      <CardHeader className='pb-2'>
        <Badge className='mb-2 w-full justify-center'>{match.championnat}</Badge>
        <CardTitle className={`mb-2 flex items-center justify-center`}>
          {match.isHome ? <HomeIcon className='mr-2' /> : <PlaneIcon className='mr-2' />}
          <span className='font-semibold'>{match.isHome ? match.nomEquipe2 : match.nomEquipe1}</span>
        </CardTitle>
        <div className='text-center text-sm text-muted-foreground'>
          Journée {match.matchNumberJournee} - Match n°{match.matchNumber}
        </div>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{isDefaultMatch ? `WE du ${match.formatedDate}` : match.formatedDate}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <ClockIcon className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{isDefaultMatch ? '--:--' : match.heure}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <MapPinIcon className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{isDefaultMatch ? '❓' : match.salle}</span>
          </div>
          <div className='mt-2 text-center text-lg font-bold'>
            <span>{match.resultatEquipe1}</span>
            {' - '}
            <span>{match.resultatEquipe2}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-wrap justify-center gap-2 pt-2'>
        {match.forfaitEquipe1 && <Badge variant='destructive'>Forfait {match.nomEquipe1}</Badge>}
        {match.forfaitEquipe2 && <Badge variant='destructive'>Forfait {match.nomEquipe2}</Badge>}
      </CardFooter>
    </Card>
  );
}
