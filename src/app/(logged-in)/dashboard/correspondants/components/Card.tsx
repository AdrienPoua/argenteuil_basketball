'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, X, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteClub } from '../actions/server.actions';
import { CardPropsType, PropsType } from '../types/card.types';
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

export default function Index({ data }: Readonly<PropsType>) {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return <EditCard data={data} setIsEditing={setIsEditing} />;
  }
  return <ClubCard data={data} setIsEditing={setIsEditing} />;
}

export function ClubCard({ data, setIsEditing }: Readonly<CardPropsType>) {
  const handleDelete = async () => {
    await deleteClub(data.id);
  };

  return (
    <Card className='w-full max-w-md font-secondary text-muted-foreground transition-all duration-300 hover:shadow-lg'>
      <CardHeader className='relative p-6'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-2xl font-bold text-background'>{data.libelle}</CardTitle>
          <div className='flex gap-2'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' size='icon' aria-label={`Supprimer le club ${data.libelle}`}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce club ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action ne peut pas être annulée. Cela supprimera définitivement le club {data.libelle} et
                    toutes les données associées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Confirmer la suppression</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button size='icon' onClick={() => setIsEditing(true)} aria-label={`Modifier le club ${data.libelle}`}>
              <Pencil className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4 p-6 pt-0'>
        <div className='flex items-center gap-3 rounded-md bg-primary/10 p-3'>
          <Badge>
            <Mail className='mr-2 h-4 w-4' />
            Email
          </Badge>
          <p className='text-sm font-medium'>{data.email}</p>
        </div>
        <div className='flex items-center gap-3 rounded-md bg-secondary/10 p-3'>
          <Badge variant='secondary'>
            <Phone className='mr-2 h-4 w-4' />
            Téléphone
          </Badge>
          <p className='text-sm font-medium'>{data.phone}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const EditCard = ({ data, setIsEditing }: Readonly<CardPropsType>) => {
  return (
    <div className='relative col-span-2'>
      <Button
        onClick={() => setIsEditing(false)}
        variant='destructive'
        className='absolute right-0 top-0 z-10 size-fit p-2'
      >
        <X />
      </Button>
      <Form defaultValues={data} setIsEditing={setIsEditing} />
    </div>
  );
};
