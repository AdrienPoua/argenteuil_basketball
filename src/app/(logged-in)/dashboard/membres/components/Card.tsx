'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trash, X, Mail, Phone } from 'lucide-react';
import Form from './Form';
import { PropsType, BaseCardPropsType, EditingCardPropsType } from '../types/card.types';
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
import { useRouter } from 'next/navigation';
import { EditMemberModal } from './EditMemberModal';

export default function Index({ data, teams }: Readonly<PropsType>): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return <EditingCard data={data} setIsEditing={setIsEditing} teams={teams} />;
  } else {
    return <BaseCard data={data} setIsEditing={setIsEditing} teams={teams} />;
  }
}

export function BaseCard({ data, setIsEditing, teams }: Readonly<BaseCardPropsType>) {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`/api/members/${data.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete member');
    }
    router.refresh();
  };

  return (
    <Card className='w-full max-w-md font-secondary text-background transition-all duration-300 hover:shadow-lg'>
      <CardHeader className='relative p-6 pb-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-16 w-16'>
              <AvatarImage src={data.image} alt={data.name} />
              <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className='text-2xl font-bold font-secondary'>{data.name}</CardTitle>
              {data.isLeader && (
                <Badge variant='destructive' className='mt-1'>
                  Leader
                </Badge>
              )}
            </div>
          </div>
          <div className='flex gap-2'>
            <EditMemberModal member={data} teams={teams} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive' size='icon'>
                  <Trash className='h-4 w-4' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-secondary">Êtes-vous absolument sûr ?</AlertDialogTitle>
                  <AlertDialogDescription className="font-secondary">
                    Cette action ne peut pas être annulée. Cela supprimera définitivement le membre {data.name} et
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
        </div>
      </CardHeader>
      <CardContent className='space-y-4 p-6'>
        <div className='space-y-2'>
          {data.email && (
            <div className='flex items-center space-x-2 text-sm font-secondary'>
              <Mail className='h-4 w-4 font-secondary' />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className='flex items-center space-x-2 text-sm font-secondary'>
              <Phone className='h-4 w-4 font-secondary' />
              <span>{data.phone}</span>
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <div className='flex flex-wrap gap-2'>
            {data.role.map((role) => (
              <Badge key={role} variant='secondary'>
                {role}
              </Badge>
            ))}
          </div>
          <div className='flex flex-wrap gap-2'>
            {data.teams.map((team) => (
              <Badge key={team.id}>{team.name}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const EditingCard = ({ data, setIsEditing, teams }: Readonly<EditingCardPropsType>) => {
  return (
    <div className='relative col-span-2'>
      <Button
        onClick={() => setIsEditing(false)}
        variant='destructive'
        className='absolute right-0 top-0 z-10 size-fit p-2'
      >
        <X />
      </Button>
      <Form defaultValues={data} teams={teams} setIsEditing={setIsEditing} />
    </div>
  );
};
