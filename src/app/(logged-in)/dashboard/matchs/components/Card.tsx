'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  Trophy,
  Check,
  X,
  AlertTriangle,
  HomeIcon,
  PlaneIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useMatchCard } from '../hooks/useMatchCard';
import { useMatchHandlers } from '../handlers/matchHandlers';
import { DeleteDialog } from './delete.dialog';
import { EditDialog } from './edit.dialog';
import { ConvocationDialog } from './convocation.dialog';
import { AskConvocationDialog } from './askConvocation.dialog';
import Match from '@/models/Match';

type PropsType = {
  match: ReturnType<Match['toPlainObject']>;
};

export default function MatchCard({ match }: Readonly<PropsType>) {
  return (
    <Card className='size-full overflow-hidden bg-card font-secondary shadow-md transition-all duration-300 hover:shadow-lg'>
      {/* En-tête avec le statut du match */}
      <CardHeader
        className={cn(
          'flex items-center justify-between px-4 py-2',
          'bg-primary',
          match.forfaitEquipe1 || match.forfaitEquipe2 ? 'bg-red-600' : '',
        )}
      >
        <Header match={match} />
      </CardHeader>
      <CardContent className='p-0'>
        <MatchVisual match={match} />
        <MatchInformations match={match} />
        <StatusTags match={match} />
      </CardContent>

      {/* Actions en bas de la carte */}
      <CardFooter className='flex flex-col justify-end'>
        <Dialogs match={match} />
      </CardFooter>
    </Card>
  );
}

const Header = ({ match }: Readonly<PropsType>) => {
  return (
    <div className='flex w-full justify-between'>
      <Badge variant='staffCard'>{match.isHome ? <HomeIcon /> : <PlaneIcon />}</Badge>
      <Badge variant='outline' className='font-bold'>
        {match.championnat}
      </Badge>
      <div className='flex-shrink-0 text-sm font-medium'>#{match.matchNumber}</div>
    </div>
  );
};

const MatchVisual = ({ match }: Readonly<PropsType>) => {
  return (
    <div className='p-4 pb-0'>
      <div className='mb-4 flex flex-col space-y-3'>
        {/* Équipe 1 */}
        <div className={cn('flex items-center justify-between rounded-lg bg-primary px-5 py-3')}>
          <HomeIcon className='mr-2 h-6 w-6 text-foreground' />
          <div className={cn('size-full font-semibold')}>{match.nomEquipe1}</div>
          <div className='text-foreground'>{match.resultatEquipe1 ?? '-'}</div>
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
        <div className={cn('flex items-center justify-between rounded-lg bg-primary px-5 py-3')}>
          <div className={cn('size-full font-semibold')}>{match.nomEquipe2}</div>
          <div className='text-foreground'>{match.resultatEquipe2 ?? '-'}</div>
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
  );
};

const MatchInformations = ({ match }: Readonly<PropsType>) => {
  return (
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
  );
};

const Dialogs = ({ match }: Readonly<PropsType>) => {
  const {
    isDialogOpen,
    setIsDialogOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting,
    setIsDeleting,
    setIsMarkingAsReceived,
    router,
    toast,
    onFormSubmitSuccess,
    isAskConvocationDialogOpen,
    setIsAskConvocationDialogOpen,
  } = useMatchCard();

  const { handleSendConvocation, handleDeleteMatch } = useMatchHandlers({
    match,
    setIsDialogOpen,
    toast,
    router,
    setIsDeleting,
    setIsMarkingAsReceived,
  });
  return (
    <div className='flex size-full flex-col justify-end gap-2'>
      {match.isHome && (
        <ConvocationDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onConfirm={handleSendConvocation}
          match={match}
        />
      )}
      {!match.isHome && (
        <AskConvocationDialog
          isOpen={isAskConvocationDialogOpen}
          onOpenChange={setIsAskConvocationDialogOpen}
          onConfirm={handleSendConvocation}
          match={match}
        />
      )}
      <EditDialog
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        match={match}
        onSuccess={onFormSubmitSuccess}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteMatch}
        isDeleting={isDeleting}
      />
    </div>
  );
};

const StatusTags = ({ match }: Readonly<PropsType>) => {
  return (
    <>
      {match.isHome && (
        <div className='border-t border-muted/30 bg-muted/5 p-4'>
          <div className='flex flex-col space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-primary'>Statut de la convocation</span>
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
          </div>
        </div>
      )}
    </>
  );
};
