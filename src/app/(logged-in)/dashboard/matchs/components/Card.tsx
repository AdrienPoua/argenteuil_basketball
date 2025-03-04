'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  Mail,
  Trash2,
  Pencil,
  Trophy,
  Check,
  X,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { PropsType } from '../types/card.types';
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
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils/cn';

export default function MatchCard({ match }: Readonly<PropsType>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarkingAsReceived, setIsMarkingAsReceived] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSendConvocation = () => {
    setIsDialogOpen(false);
    sendConvocation(match);
    toast({
      title: 'Convocation envoyée',
      description: 'La convocation a été envoyée avec succès.',
      variant: 'success',
    });
  };

  const handleAskConvocation = () => {
    askConvocation(match);
    setIsDialogOpen(false);
    toast({
      title: 'Demande envoyée',
      description: 'Votre demande de convocation a été envoyée.',
      variant: 'success',
    });
  };

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

      toast({
        title: 'Match supprimé',
        description: 'Le match a été supprimé avec succès.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du match :', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le match. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const onFormSubmitSuccess = () => {
    setIsEditModalOpen(false);
    toast({
      title: 'Match modifié',
      description: 'Les informations du match ont été mises à jour avec succès.',
      variant: 'success',
    });
  };

  const handleMarkAsReceived = async () => {
    setIsMarkingAsReceived(true);
    try {
      const response = await fetch(`/api/matchs/${match.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isConvocationRecu: true }),
      });

      if (!response.ok) {
        throw new Error('Impossible de mettre à jour le statut de réception');
      }

      toast({
        title: 'Convocation marquée comme reçue',
        description: 'Le statut a été mis à jour avec succès.',
        variant: 'success',
      });
      router.refresh();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsMarkingAsReceived(false);
    }
  };

  // Détermine si le match a un résultat
  const hasResult = match.resultatEquipe1 !== null && match.resultatEquipe2 !== null;

  // Détermine le statut du match (à venir, terminé, etc.)
  const matchDate = new Date(match.formatedDate);
  const isUpcoming = matchDate > new Date();

  return (
    <Card className='size-full overflow-hidden bg-card font-secondary shadow-md transition-all duration-300 hover:shadow-lg'>
      {/* En-tête avec le statut du match */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2',
          isUpcoming ? 'bg-blue-600 text-white' : 'bg-green-500 text-white',
          match.remise && 'bg-gray-600',
          match.forfaitEquipe1 || match.forfaitEquipe2 ? 'bg-red-600' : '',
        )}
      >
        <div className='flex items-center space-x-2'>
          <Badge variant='outline' className='border-none bg-white/20'>
            {match.championnat}
          </Badge>
          <Badge variant='outline' className='border-none bg-white/20'>
            {match.isHome ? 'DOMICILE' : 'VISITEUR'}
          </Badge>
        </div>
        <div className='flex-shrink-0 text-sm font-medium'>
          J.{match.matchNumberJournee} - #{match.matchNumber}
        </div>
      </div>

      {/* Contenu principal */}
      <CardContent className='p-0'>
        {/* Section des équipes et du score */}
        <div className='p-4 pb-0'>
          <div className='mb-4 flex flex-col space-y-3'>
            {/* Équipe 1 */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <div
                  className={cn(
                    'h-12 w-2 rounded-full',
                    match.nomEquipe1.includes('ARGENTEUIL') ? 'bg-primary' : 'bg-muted',
                  )}
                ></div>
                <div className='font-semibold'>{match.nomEquipe1}</div>
              </div>
              <div
                className={cn(
                  'text-2xl font-bold',
                  hasResult && Number(match.resultatEquipe1) > Number(match.resultatEquipe2)
                    ? 'text-primary'
                    : 'text-red-500',
                )}
              >
                {match.resultatEquipe1 ?? '-'}
              </div>
            </div>

            {/* Décorateur central */}
            <div className='flex items-center justify-center space-x-2'>
              <div className='h-[1px] flex-grow bg-muted'></div>
              <div className='rounded-full bg-muted p-1'>
                <Trophy className='h-4 w-4 text-muted-foreground' />
              </div>
              <div className='h-[1px] flex-grow bg-muted'></div>
            </div>

            {/* Équipe 2 */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <div
                  className={cn(
                    'h-12 w-2 rounded-full',
                    match.nomEquipe2.includes('ARGENTEUIL') ? 'bg-primary' : 'bg-muted',
                  )}
                ></div>
                <div className='font-semibold'>{match.nomEquipe2}</div>
              </div>
              <div
                className={cn(
                  'text-2xl font-bold',
                  hasResult && Number(match.resultatEquipe2) > Number(match.resultatEquipe1)
                    ? 'text-primary'
                    : 'text-red-500',
                )}
              >
                {match.resultatEquipe2 ?? '-'}
              </div>
            </div>
          </div>

          {/* Statuts spéciaux */}
          {(match.remise || match.forfaitEquipe1 || match.forfaitEquipe2) && (
            <div className='mb-3 mt-1 rounded-md bg-muted/30 p-2'>
              <div className='flex items-center gap-2 text-sm'>
                <AlertTriangle className='h-4 w-4 text-amber-500' />
                {match.remise && <span className='font-medium text-amber-700'>Match remis</span>}
                {match.forfaitEquipe1 && <span className='font-medium text-red-600'>Forfait {match.nomEquipe1}</span>}
                {match.forfaitEquipe2 && <span className='font-medium text-red-600'>Forfait {match.nomEquipe2}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Informations sur le lieu et l'heure */}
        <div className='border-t border-muted/30 bg-muted/10 p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center space-x-2 text-sm'>
              <div className='rounded-full bg-muted/30 p-1.5'>
                <CalendarIcon className='h-3.5 w-3.5 text-muted-foreground' />
              </div>
              <span className='text-muted-foreground'>{match.formatedDate}</span>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <div className='rounded-full bg-muted/30 p-1.5'>
                <ClockIcon className='h-3.5 w-3.5 text-muted-foreground' />
              </div>
              <span className='text-muted-foreground'>{match.heure}</span>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <div className='rounded-full bg-muted/30 p-1.5'>
                <MapPinIcon className='h-3.5 w-3.5 text-muted-foreground' />
              </div>
              <span className='truncate text-muted-foreground'>{match.salle}</span>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <div className='rounded-full bg-muted/30 p-1.5'>
                <UserIcon className='h-3.5 w-3.5 text-muted-foreground' />
              </div>
              <span className='truncate text-muted-foreground'>{match.correspondant}</span>
            </div>
          </div>
        </div>

        {/* Section pour la convocation */}
        {match.isHome && (
          <div className='border-t border-muted/30 bg-muted/5 p-4'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Statut de la convocation</span>
                <Badge
                  variant='outline'
                  className={cn(
                    'text-xs font-normal',
                    match.convocationIsSent
                      ? 'border-green-300 bg-green-100 text-green-800'
                      : 'border-red-300 bg-red-100 text-red-800',
                  )}
                >
                  {match.convocationIsSent ? (
                    <div className='flex items-center'>
                      <Check className='mr-1 h-3 w-3' />
                      Envoyée
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <X className='mr-1 h-3 w-3' />
                      Non envoyée
                    </div>
                  )}
                </Badge>
              </div>

              {match.convocationIsSent ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800'
                    >
                      <Mail className='mr-2 h-4 w-4' />
                      <span>Renvoyer la convocation</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='font-seco'>
                    <DialogHeader>
                      <DialogTitle>Confirmer le renvoi</DialogTitle>
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
                <Button className='w-full bg-primary/90 hover:bg-primary' onClick={() => sendConvocation(match)}>
                  <Mail className='mr-2 h-4 w-4' />
                  <span>Envoyer la convocation</span>
                </Button>
              )}
            </div>
          </div>
        )}

        {!match.isHome && (
          <div className='border-t border-muted/30 bg-muted/5 p-4'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <div className='flex flex-col space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Statut de la demande</span>
                  {match.convocationIsAsked ? (
                    <Badge variant='outline' className='border-blue-300 bg-blue-100 text-xs font-normal text-blue-800'>
                      <div className='flex items-center'>
                        <Check className='mr-1 h-3 w-3' />
                        Demandée
                      </div>
                    </Badge>
                  ) : (
                    <Badge variant='outline' className='border-red-300 bg-red-100 text-xs font-normal text-red-800'>
                      <div className='flex items-center'>
                        <X className='mr-1 h-3 w-3' />
                        Non demandée
                      </div>
                    </Badge>
                  )}
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Statut de réception</span>
                  {match.isConvocationRecu ? (
                    <Badge
                      variant='outline'
                      className='border-green-300 bg-green-100 text-xs font-normal text-green-800'
                    >
                      <div className='flex items-center'>
                        <Check className='mr-1 h-3 w-3' />
                        Reçue
                      </div>
                    </Badge>
                  ) : (
                    <Badge variant='outline' className='border-red-300 bg-red-100 text-xs font-normal text-red-800'>
                      <div className='flex items-center'>
                        <X className='mr-1 h-3 w-3' />
                        Non reçue
                      </div>
                    </Badge>
                  )}
                </div>

                <div className='flex flex-col gap-2'>
                  <DialogTrigger asChild>
                    <Button
                      variant={match.convocationIsAsked ? 'outline' : 'default'}
                      className={
                        match.convocationIsAsked
                          ? 'w-full border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'w-full'
                      }
                      disabled={match.convocationIsAsked}
                    >
                      <Mail className='mr-2 h-4 w-4' />
                      <span>{match.convocationIsAsked ? 'Demande déjà envoyée' : 'Demander la convocation'}</span>
                    </Button>
                  </DialogTrigger>

                  {match.convocationIsAsked && !match.isConvocationRecu && (
                    <Button
                      variant='outline'
                      className='w-full border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
                      onClick={handleMarkAsReceived}
                      disabled={isMarkingAsReceived}
                    >
                      <Download className='mr-2 h-4 w-4' />
                      <span>{isMarkingAsReceived ? 'Mise à jour...' : 'Marquer comme reçue'}</span>
                    </Button>
                  )}
                </div>
              </div>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmer la demande</DialogTitle>
                  <DialogDescription>Voulez-vous demander la convocation pour ce match ?</DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex gap-2'>
                  <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  {match.convocationIsAsked ? (
                    <Badge variant='outline' className='border-blue-300 bg-blue-100 text-blue-800'>
                      Demande déjà envoyée
                    </Badge>
                  ) : (
                    <Button onClick={handleAskConvocation}>Envoyer la demande</Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>

      {/* Actions en bas de la carte */}
      <CardFooter className='mt-auto flex grow justify-end gap-2 border-t bg-muted/5 p-2'>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button size='sm' className='h-8 gap-1 text-xs'>
              <Pencil className='h-3 w-3' />
              Modifier
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-3xl'>
            <DialogHeader>
              <DialogTitle className='font-secondary text-xl font-bold'>Modifier le match</DialogTitle>
            </DialogHeader>
            <Form match={match} setIsEditing={() => setIsEditModalOpen(false)} onSuccess={onFormSubmitSuccess} />
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size='sm'
              variant='outline'
              className='h-8 gap-1 border-red-200 bg-red-50 text-xs text-red-600 hover:bg-red-100 hover:text-red-700'
            >
              <Trash2 className='h-3 w-3' />
              Supprimer
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
              <Button onClick={() => setIsDeleteDialogOpen(false)}>Annuler</Button>
              <Button variant='destructive' onClick={handleDeleteMatch} disabled={isDeleting}>
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
