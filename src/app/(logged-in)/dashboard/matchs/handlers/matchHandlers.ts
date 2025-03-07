'use client';

import Match from '@/models/Match';
import { askConvocation, sendConvocation } from '../actions/server.actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type PropsType = {
  match: ReturnType<Match['toPlainObject']>;
  setIsDialogOpen: (value: boolean) => void;
  toast: any;
  router: AppRouterInstance;
  setIsDeleting: (value: boolean) => void;
  setIsMarkingAsReceived: (value: boolean) => void;
};

export const useMatchHandlers = ({
  match,
  setIsDialogOpen,
  toast,
  router,
  setIsDeleting,
  setIsMarkingAsReceived,
}: PropsType) => {
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

  return {
    handleSendConvocation,
    handleAskConvocation,
    handleDeleteMatch,
    handleMarkAsReceived,
  };
}; 