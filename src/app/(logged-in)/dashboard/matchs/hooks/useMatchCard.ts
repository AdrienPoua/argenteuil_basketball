'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export const useMatchCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarkingAsReceived, setIsMarkingAsReceived] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onFormSubmitSuccess = () => {
    setIsEditModalOpen(false);
    toast({
      title: 'Match modifié',
      description: 'Les informations du match ont été mises à jour avec succès.',
      variant: 'success',
    });
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting,
    setIsDeleting,
    isMarkingAsReceived,
    setIsMarkingAsReceived,
    router,
    toast,
    onFormSubmitSuccess,
  };
};
