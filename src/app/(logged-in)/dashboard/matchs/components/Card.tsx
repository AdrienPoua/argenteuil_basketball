'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, ClockIcon, UserIcon, Mail, Trash2 } from 'lucide-react';
import { PropsType, EditingCardPropsType } from '../types/card.types';
import Form from './Form';
import { askConvocation, sendConvocation } from '../actions/server.actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function Index({ match }: Readonly<PropsType>) {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return <EditingCard match={match} setIsEditing={setIsEditing} />;
  } else {
    return <BaseCard match={match} setIsEditing={setIsEditing} />;
  }
}

const BaseCard = ({ match, setIsEditing }: Readonly<EditingCardPropsType>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSendConvocation = () => {
    setIsDialogOpen(false);
    sendConvocation(match);
  };

  const handleAskConvocation = () => {
    askConvocation(match);
    setIsDialogOpen(false);
  };

  if (match.matchNumber === 80308) {
    console.log(match);
  }

  return (
    <Card className='mx-auto w-full max-w-md p-3 font-secondary text-black'>
      <Badge variant='match'>{match.championnat}</Badge>
      <Badge variant='match' className={match.isHome ? 'bg-primary' : 'bg-green-500'}>
        {match.isHome ? 'DOMICILE' : 'VISITEUR'}
      </Badge>
      <CardHeader className='mb-3 flex flex-row items-center justify-between'>
        <CardTitle className='mb w-full text-center text-lg'>
          Journée {match.matchNumberJournee} - Match n°{match.matchNumber}
        </CardTitle>
        <div className='flex'>
          <Button onClick={() => setIsEditing(true)}>Modifier</Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='text-left font-semibold'>{match.nomEquipe1}</div>
          <div className='text-2xl font-bold'>{match.resultatEquipe1 ?? '-'}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-left font-semibold'>{match.nomEquipe2}</div>
          <div className='text-2xl font-bold'>{match.resultatEquipe2 ?? '-'}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <CalendarIcon className='h-4 w-4' />
          <span>{match.formatedDate}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <ClockIcon className='h-4 w-4' />
          <span>{match.heure}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <MapPinIcon className='h-4 w-4' />
          <span>{match.salle}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <UserIcon className='h-4 w-4' />
          <span>{match.correspondant}</span>
        </div>
        {match.isHome && (
          <>
            <Badge
              variant='match'
              className={
                match.convocationIsSent ? 'cursor-pointer bg-green-500 text-sm' : 'cursor-pointer bg-red-500 text-sm'
              }
            >
              {match.convocationIsSent ? ' ✅Convocation ✅' : '❌ Convocation ❌'}
            </Badge>

            {match.convocationIsSent ? (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className='w-full'>
                    <Mail className='mr-2 h-4 w-4' />
                    <span>Envoyer convocation</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer l&apos;envoi</DialogTitle>
                    <DialogDescription>
                      Une convocation a déjà été envoyée pour ce match. Voulez-vous en envoyer une nouvelle ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className='flex gap-2'>
                    <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSendConvocation}>Confirmer l&apos;envoi</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button className='w-full' onClick={() => sendConvocation(match)}>
                <Mail className='mr-2 h-4 w-4' />
                <span>Envoyer convocation</span>
              </Button>
            )}
          </>
        )}
        {!match.isHome && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className='w-full'>
                <Mail className='mr-2 h-4 w-4' />
                <span>Demander la convocation</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer l&apos;envoi</DialogTitle>
                <DialogDescription>Voulez-vous demander la convocation pour ce match ?</DialogDescription>
              </DialogHeader>
              <DialogFooter className='flex gap-2'>
                <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                {match.convocationIsAsked ? (
                  <Badge variant='match' className='bg-green-500'>
                    Convocation demandée
                  </Badge>
                ) : (
                  <Button onClick={handleAskConvocation}>Demander la convocation</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
      <CardFooter className='flex flex-wrap justify-between gap-2'>
        {match.remise && <Badge variant='destructive'>Remis</Badge>}
        {match.forfaitEquipe1 && <Badge variant='destructive'>Forfait {match.nomEquipe1}</Badge>}
        {match.forfaitEquipe2 && <Badge variant='destructive'>Forfait {match.nomEquipe2}</Badge>}
      </CardFooter>
    </Card>
  );
};

const EditingCard = ({ match, setIsEditing }: Readonly<EditingCardPropsType>) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteMatch = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/matchs/${match.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Impossible de supprimer le match');
      }

      // Fermez la boîte de dialogue et rafraîchissez la page
      setIsDeleteDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Erreur lors de la suppression du match :', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className='mx-auto w-full max-w-md p-3 font-secondary text-black'>
      <div className='mb-2 flex justify-end'>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='destructive' size='icon'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer ce match ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mt-4 flex gap-2'>
              <Button variant='outline' onClick={() => setIsDeleteDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant='destructive' onClick={handleDeleteMatch} disabled={isDeleting}>
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Form match={match} setIsEditing={setIsEditing} />
    </Card>
  );
};
