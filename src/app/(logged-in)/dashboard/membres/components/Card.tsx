'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trash, Mail, Phone } from 'lucide-react';
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
import Member from '@/models/Member';
import Team from '@/models/Team';

export type TypeProps = {
  data: ReturnType<Member['toPlainObject']>;
  teams: ReturnType<Team['toPlainObject']>[];
  };

export default function CardIndex({ data, teams }: Readonly<TypeProps>) {
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
              <CardTitle className='font-secondary text-2xl font-bold'>{data.name}</CardTitle>
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
                  <AlertDialogTitle className='font-secondary'>Êtes-vous absolument sûr ?</AlertDialogTitle>
                  <AlertDialogDescription className='font-secondary'>
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
            <div className='flex items-center space-x-2 font-secondary text-sm'>
              <Mail className='h-4 w-4 font-secondary' />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className='flex items-center space-x-2 font-secondary text-sm'>
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
