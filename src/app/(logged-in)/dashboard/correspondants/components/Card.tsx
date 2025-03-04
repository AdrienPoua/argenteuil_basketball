'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Trash2, ExternalLink, Copy, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropsType } from '../types/card.types';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
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
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ClubForm from './ClubForm';

export default function Index({ data }: Readonly<PropsType>) {
  return <ClubCard data={data} />;
}

export function ClubCard({ data }: Readonly<PropsType>) {
  const router = useRouter();
  const { toast } = useToast();
  const [hoveredCard, setHoveredCard] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/clubs/${data.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete club');
      }
      router.refresh();
      toast({
        title: 'Correspondant supprimé',
        description: `Le club ${data.libelle} a été supprimé avec succès.`,
        variant: 'success',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la suppression du club.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copié !',
      description: `${type} copié dans le presse-papier.`,
      variant: 'success',
    });
  };

  const sendEmail = () => {
    if (data.email && data.email !== "Pas d'email") {
      window.open(`mailto:${data.email}`);
    } else {
      toast({
        title: 'Information manquante',
        description: "Ce correspondant n'a pas d'adresse email renseignée.",
        variant: 'destructive',
      });
    }
  };

  const callPhone = () => {
    if (data.phone && data.phone !== 'Pas de numéro') {
      window.open(`tel:${data.phone}`);
    } else {
      toast({
        title: 'Information manquante',
        description: "Ce correspondant n'a pas de numéro de téléphone renseigné.",
        variant: 'destructive',
      });
    }
  };

  const onFormSubmitSuccess = () => {
    setEditModalOpen(false);
    toast({
      title: 'Correspondant modifié',
      description: 'Les informations du correspondant ont été mises à jour avec succès.',
      variant: 'success',
    });
  };

  return (
    <Card
      className='w-full max-w-md font-secondary text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg'
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
    >
      <CardHeader className='relative rounded-t-lg bg-gradient-to-r from-primary/90 to-primary p-6'>
        <div className='flex flex-col items-start'>
          <Badge className='mb-2 bg-white/90 font-mono text-primary hover:bg-white'>{data.code}</Badge>
          <CardTitle className='group flex items-center gap-2 text-2xl font-bold text-white'>{data.libelle}</CardTitle>
        </div>
        <div className='absolute right-4 top-6 flex gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  aria-label={`Modifier le club ${data.libelle}`}
                  onClick={() => setEditModalOpen(true)}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Modifier ce correspondant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='destructive'
                      size='icon'
                      className='opacity-90 hover:opacity-100'
                      aria-label={`Supprimer le club ${data.libelle}`}
                    >
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
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer ce correspondant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className='space-y-4 p-6'>
        <div className={`flex items-center rounded-md border p-3 transition-all ${hoveredCard ? 'bg-primary/5' : ''}`}>
          <div className='flex flex-1 items-center gap-3'>
            <Badge className='bg-primary'>
              <Mail className='mr-2 h-4 w-4' />
              Email
            </Badge>
            <p className='truncate text-sm font-medium'>{data.email}</p>
          </div>
          <div className='flex gap-1'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7'
                    onClick={() => copyToClipboard(data.email, 'Email')}
                    disabled={data.email === "Pas d'email"}
                  >
                    <Copy className='h-3.5 w-3.5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copier l&apos;email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7'
                    onClick={sendEmail}
                    disabled={data.email === "Pas d'email"}
                  >
                    <ExternalLink className='h-3.5 w-3.5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Envoyer un email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className={`flex items-center rounded-md border p-3 transition-all ${hoveredCard ? 'bg-primary/5' : ''}`}>
          <div className='flex flex-1 items-center gap-3'>
            <Badge variant='outline' className='border-primary text-primary'>
              <Phone className='mr-2 h-4 w-4' />
              Téléphone
            </Badge>
            <p className='truncate text-sm font-medium'>{data.phone}</p>
          </div>
          <div className='flex gap-1'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7'
                    onClick={() => copyToClipboard(data.phone, 'Téléphone')}
                    disabled={data.phone === 'Pas de numéro'}
                  >
                    <Copy className='h-3.5 w-3.5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copier le numéro</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7'
                    onClick={callPhone}
                    disabled={data.phone === 'Pas de numéro'}
                  >
                    <ExternalLink className='h-3.5 w-3.5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Appeler</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle className='font-secondary text-xl font-bold'>Modifier le correspondant</DialogTitle>
          </DialogHeader>
          <ClubForm defaultValues={data} onSuccess={onFormSubmitSuccess} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
