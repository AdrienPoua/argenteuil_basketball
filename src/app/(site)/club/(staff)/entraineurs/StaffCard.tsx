'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Ban, Mail, Phone, PhoneOff } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import Member from '@/models/Member';
import ScaleFromBottom from '@/components/motion/ScaleFromBottom';

type PropsType = {
  data: Readonly<ReturnType<Member['toPlainObject']>>;
};

export default function Index({ data }: Readonly<PropsType>) {
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const handleEmailClick = () => {
    if (data.email) window.open(`mailto:${data.email}`);
  };

  const handlePhoneClick = () => {
    if (data.phone) {
      if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        window.open(`tel:${data.phone}`);
      } else {
        setIsNumberVisible((prev) => !prev);
      }
    }
  };

  return (
    <ScaleFromBottom className='w-full max-w-sm'>
      <Card className='overflow-hidden rounded-lg bg-transparent shadow-lg'>
        <CardHeader className='p-0'>
          <div className='relative aspect-square overflow-hidden'>
            <Image src={data.image} alt={data.name} fill className='object-cover object-top' />
          </div>
        </CardHeader>
        <CardContent className='p-4'>
          <h3 className='text-center text-2xl font-semibold'>{data.name}</h3>
          {data.role.map((role, i) => (
            <p className='text-center text-muted-foreground' key={role + i}>
              {role}
            </p>
          ))}
          {data.teams.length > 0 && (
            <div className='mt-2 flex flex-wrap justify-center gap-2'>
              {data.teams.map((team) => (
                <Badge key={team.id} variant='staffCard'>
                  {team.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className='flex justify-around bg-transparent p-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' onClick={handleEmailClick} disabled={!data.email}>
                  {data.email ? <Mail className='h-5 w-5' /> : <Ban className='h-5 w-5' />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{data.email ? 'Envoyer un email' : 'Email not available'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size={isNumberVisible ? undefined : 'icon'}
                  onClick={handlePhoneClick}
                  disabled={!data.phone}
                >
                  {data.phone &&
                    (isNumberVisible ? (
                      <span className='p-3 text-sm font-medium'>{data.phone}</span>
                    ) : (
                      <Phone className='h-5 w-5' />
                    ))}
                  {!data.phone && <PhoneOff className='h-5 w-5' />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {data.phone && (isNumberVisible ? 'Masquer le numéro' : 'Voir le numéro')}
                {!data.phone && 'Numéro de téléphone non disponible'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </ScaleFromBottom>
  );
}
