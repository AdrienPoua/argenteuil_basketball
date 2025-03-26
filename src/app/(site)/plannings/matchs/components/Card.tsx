'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon, ClockIcon, HomeIcon, PlaneIcon } from 'lucide-react';
import Image from 'next/image';
import Match from '@/models/Match';
import { Skeleton } from '@/components/ui/skeleton';

type PropsType = { match: ReturnType<Match['toPlainObject']> };

export default function BasketMatchCard({ match }: Readonly<PropsType>) {
  const isDefaultMatch = match.heure === '00:00';
  return (
    <Card
      className={`h-full w-full p-2 text-black sm:p-3 ${
        match.isHome ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-green-500'
      } relative overflow-hidden transition-all hover:shadow-md`}
    >
      {match.remise && (
        <div className='absolute bottom-0 right-0 flex w-full justify-end'>
          <Image
            src='/images/divers/report.png'
            alt='Remise'
            className='object-contain opacity-70'
            width={100}
            height={100}
          />
        </div>
      )}
      <CardHeader className='p-2 pb-1 sm:p-3'>
        <Badge
          variant='outline'
          className='mb-2 w-full justify-center bg-primary/10 text-xs font-medium text-primary sm:text-sm'
        >
          {match.championnat}
        </Badge>
        <CardTitle className={`mb-1 flex items-center justify-center gap-1 text-sm sm:mb-2 sm:gap-2 sm:text-base`}>
          {match.isHome ? (
            <HomeIcon className='h-4 w-4 text-blue-500' />
          ) : (
            <PlaneIcon className='h-4 w-4 text-green-500' />
          )}
          <span className='truncate font-semibold'>{match.isHome ? match.nomEquipe2 : match.nomEquipe1}</span>
        </CardTitle>
        <div className='text-center text-xs text-muted-foreground'>
          Journée {match.matchNumberJournee} - Match n°{match.matchNumber}
        </div>
      </CardHeader>
      <CardContent className='p-2 pt-1 sm:p-3'>
        <div className='flex flex-col space-y-1 sm:space-y-2'>
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <CalendarIcon className='h-3.5 w-3.5 text-primary/70 sm:h-4 sm:w-4' />
            <span className='text-xs sm:text-sm'>
              {isDefaultMatch ? `WE du ${match.formatedDate}` : match.formatedDate}
            </span>
          </div>
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <ClockIcon className='h-3.5 w-3.5 text-primary/70 sm:h-4 sm:w-4' />
            <span className='text-xs sm:text-sm'>{isDefaultMatch ? '--:--' : match.heure}</span>
          </div>
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <MapPinIcon className='h-3.5 w-3.5 text-primary/70 sm:h-4 sm:w-4' />
            <span className='truncate text-xs sm:text-sm'>{isDefaultMatch ? '❓' : match.salle}</span>
          </div>
          <div className='mt-1 rounded-md bg-slate-50 p-1 text-center text-base font-bold sm:mt-2 sm:p-2 sm:text-lg'>
            {match.resultatEquipe1 === null || match.resultatEquipe2 === null ? (
              <span>-</span>
            ) : (
              <>
                <span>{match.resultatEquipe1}</span>
                {' - '}
                <span>{match.resultatEquipe2}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
      {(match.forfaitEquipe1 || match.forfaitEquipe2) && (
        <CardFooter className='flex flex-wrap justify-center gap-1 p-2 pt-0 sm:gap-2 sm:p-3 sm:pt-0'>
          {match.forfaitEquipe1 && (
            <Badge variant='destructive' className='text-xs'>
              Forfait {match.nomEquipe1}
            </Badge>
          )}
          {match.forfaitEquipe2 && (
            <Badge variant='destructive' className='text-xs'>
              Forfait {match.nomEquipe2}
            </Badge>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export function SkeletonCard() {
  return (
    <Card className='relative h-full w-full overflow-hidden p-2 sm:p-3'>
      <CardHeader className='p-2 pb-1 sm:p-3'>
        <Skeleton className='mb-2 h-5 w-full' />
        <Skeleton className='mx-auto mb-2 h-5 w-3/4' />
        <Skeleton className='mx-auto h-3 w-1/2' />
      </CardHeader>
      <CardContent className='p-2 pt-1 sm:p-3'>
        <div className='flex flex-col space-y-1 sm:space-y-2'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex items-center gap-1.5 sm:gap-2'>
              <Skeleton className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
              <Skeleton className='h-3.5 w-24 sm:h-4 sm:w-32' />
            </div>
          ))}

          <div className='mt-1 text-center sm:mt-2'>
            <Skeleton className='mx-auto h-5 w-16 sm:h-6 sm:w-24' />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center gap-1 p-2 pt-0 sm:gap-2 sm:p-3 sm:pt-0'>
        <Skeleton className='h-4 w-16 sm:h-5 sm:w-24' />
      </CardFooter>
    </Card>
  );
}
