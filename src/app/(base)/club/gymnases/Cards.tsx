'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import Image from 'next/image';

type GymCardProps = {
  image: string;
  name: string;
  adress: string;
  city: string;
};

export default function GymCard({ image, name, adress, city }: Readonly<GymCardProps>): React.ReactElement {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      onClick={handleClick}
      className='relative h-72 w-full cursor-pointer overflow-hidden rounded-lg border-none shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 lg:h-[600px]'
    >
      {/* Background image */}
      <div className='absolute inset-0 z-0 overflow-hidden rounded-lg'>
        <Image src={image} alt={name} className='h-full w-full object-cover' layout='fill' />
      </div>

      {/* Overlay for click effect */}
      <div
        className={`absolute inset-0 z-10 bg-black transition-opacity duration-300 ${
          isClicked ? 'opacity-50' : 'opacity-0'
        }`}
      />

      {/* Card Content */}
      <CardContent className='absolute inset-0 z-20 flex flex-col items-center justify-center text-white'>
        {!isClicked ? (
          <h2 className='w-full bg-black bg-opacity-60 p-2 text-center text-3xl lg:text-5xl'>{name}</h2>
        ) : (
          <div className='flex flex-col'>
            <p className='text-center text-xl md:text-3xl lg:text-5xl'>{adress}</p>
            <p className='text-center text-xl md:text-3xl lg:text-5xl'>{city}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
