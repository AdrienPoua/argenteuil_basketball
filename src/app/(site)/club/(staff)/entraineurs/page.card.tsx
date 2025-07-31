'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Ban, Mail, Phone, PhoneOff } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import ScaleFromBottom from '@/components/motion/ScaleFromBottom';

interface PropsType {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: string[];
    image?: string;
    contact_privacy: {
      showEmail: boolean;
      showPhone: boolean;
    };
    created_at: string;
    teams: {
      id: string;
      name: string;
      category: string[];
      gender: string;
      level: string;
      image?: string;
    }[];
  };
}

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
            <Image
              src={data.image || '/images/default/coach.avif'}
              alt={data.first_name}
              fill
              className='object-cover object-top'
            />
          </div>
        </CardHeader>
        <CardContent className='p-4'>
          <h3 className='text-center text-2xl font-semibold text-primary'>{data.first_name}</h3>
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
                <Button size='icon' onClick={handleEmailClick} disabled={!data.email}>
                  {data.email ? <Mail className='h-5 w-5' /> : <Ban className='h-5 w-5' />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{data.email ? 'Envoyer un email' : 'Email not available'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={isNumberVisible ? undefined : 'icon'} onClick={handlePhoneClick} disabled={!data.phone}>
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
