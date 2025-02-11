'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Pencil, X, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { deleteTeam } from '../actions/server.actions';
import { BaseCardPropsType, EditingCardPropsType, PropsType } from '../types/card.types';
import { useState } from 'react';
import Form from './Form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Index({ data, members }: Readonly<PropsType>) {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return <EditCard data={data} members={members} setIsEditing={setIsEditing} />;
  }
  return <TeamCard data={data} setIsEditing={setIsEditing} />;
}

export function TeamCard({ data, setIsEditing }: Readonly<BaseCardPropsType>) {
  const [isSessionsExpanded, setIsSessionsExpanded] = useState(false);

  const handleDelete = async () => {
    await deleteTeam(data.id);
  };

  return (
    <Card className='w-full max-w-md font-secondary text-muted-foreground transition-all duration-300 hover:shadow-lg'>
      <CardHeader className='relative p-0'>
        <div className='relative aspect-video w-full overflow-hidden rounded-t-md'>
          <Image
            src={data.image}
            alt={`Photo de l'équipe ${data.name}`}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
          <CardTitle className='absolute bottom-4 left-4 z-10 text-3xl font-bold text-white'>{data.name}</CardTitle>
        </div>
        <div className='absolute right-2 top-2 z-20 flex gap-2'>
          <Button
            size='icon'
            onClick={() => setIsEditing(true)}
            aria-label={`Modifier l'équipe ${data.name}`}
            className='bg-white/80 hover:bg-white'
          >
            <Pencil className='h-4 w-4 text-primary' />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive' size='icon' className='bg-red-500/80 hover:bg-red-500'>
                <X className='h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera définitivement l&apos;équipe {data.name} et
                  toutes les données associées.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Confirmer la suppression</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

const EditCard = ({ data, members, setIsEditing }: Readonly<EditingCardPropsType>) => {
  return (
    <div className='relative col-span-2'>
      <Button
        onClick={() => setIsEditing(false)}
        variant='destructive'
        className='absolute right-0 top-0 z-10 size-fit p-2'
      >
        <X />
      </Button>
      <Form defaultValues={data} members={members} setIsEditing={setIsEditing} />
    </div>
  );
};
