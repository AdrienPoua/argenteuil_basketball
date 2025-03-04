'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ClubForm from './ClubForm';

export function AddCorrespondantModal() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onFormSubmitSuccess = () => {
    setOpen(false);
    toast({
      title: "Correspondant ajouté",
      description: "Le nouveau correspondant a été ajouté avec succès.",
      variant: "success",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-foreground text-background" onClick={() => setOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Ajouter un correspondant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-secondary">Ajouter un nouveau correspondant</DialogTitle>
        </DialogHeader>
        <ClubForm
          onSuccess={onFormSubmitSuccess}
        />
      </DialogContent>
    </Dialog>
  );
} 