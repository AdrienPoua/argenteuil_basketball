'use client';
import { useState } from 'react';
import Team from '@/models/Team';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

type PropsType = {
  data: ReturnType<Team['toPlainObject']>;
};

export default function TeamCard({ data }: Readonly<PropsType>) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Card
      onClick={() => setIsClicked(!isClicked)}
      className='relative h-[300px] w-full cursor-pointer overflow-hidden rounded-lg border-none shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 md:h-[600px]'
    >
      <div
        className={`absolute inset-0 bg-black ${isClicked ? 'bg-opacity-75' : 'bg-opacity-10'} z-10 transition-opacity duration-300`}
      />
      <Image
        src={data.image}
        alt={`Les membres de l'équipe ${data.name}`}
        className='absolute inset-0 h-full w-full object-cover'
        height={1000}
        width={1000}
      />
      <CardContent className='relative z-20 flex size-full flex-col items-center justify-center'>
        {!isClicked ? (
          <h3 className='text-2xl text-white md:text-5xl'>{data.name}</h3>
        ) : (
          <div className='mt-12 flex size-full flex-col'>
            <h3 className='text-center text-3xl text-white lg:text-4xl'>{data.name}</h3>
            <div className='flex grow justify-between'>
              <div className='flex grow basis-1/2 flex-col justify-center gap-5'>
                {data.coach && (
                  <p className='mb-8 text-center md:text-lg lg:text-3xl'>
                    Coach <span className='text-primary'>{data.coach.name}</span>
                  </p>
                )}
                <p className='mb-8 text-center md:text-lg lg:text-3xl'>
                  {data.isCompetition ? 'Championnat' : 'Départemental'}
                </p>
              </div>
              <div className='flex grow basis-1/2 flex-col justify-center gap-5'>
                <p className='text-center text-base text-primary md:text-lg lg:text-3xl'>Entrainements</p>
                {data.sessions.map((session) => (
                  <p
                    key={session.day + session.start + session.end + session.gymnase}
                    className='text-center text-xs md:text-lg lg:text-3xl'
                  >
                    {`${session.day} ${session.start} - ${session.end} ${session.gymnase}`}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
