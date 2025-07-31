'use client';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import ContactForm from '@/components/forms/contact-form';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import club from '@/core/shared/config/club';

type PropsType = {
  setOpen: (open: boolean) => void;
};

export function ContactTab({ setOpen }: PropsType) {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const onSuccess = () => {
    setOpen(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 9000);
    toast.success('Message envoyé avec succès');
  };
  const onError = () => {
    setError(true);
    setTimeout(() => {
      setOpen(false);
      setError(false);
    }, 9000);
    toast.error("Une erreur est survenue lors de l'envoi du message");
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className='flex items-center gap-2 text-xl text-primary'>
          <Mail className='h-5 w-5 text-primary' />
          Contactez-nous
        </DialogTitle>
        <DialogDescription className='mb-4'>
          Une question ? Une demande ? Nous sommes là pour vous aider !
        </DialogDescription>
      </DialogHeader>
      <ContactForm onSuccess={onSuccess} onError={onError} error={error} success={success} />
      <DialogFooter className='flex-col space-y-4 sm:space-y-4'>
        <div className='mx-auto rounded-lg bg-muted/30 p-4'>
          <p className='mb-2 text-sm text-muted-foreground'>Autres moyens de contact :</p>
          <div className='space-y-2'>
            <Link
              className='flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80'
              href={`mailto:${club.contact.email}`}
            >
              <Mail className='h-4 w-4' />
              {club.contact.email}
            </Link>
            <Link
              className='flex items-center justify-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80'
              href={`tel:${club.contact.phone}`}
            >
              <Phone className='h-4 w-4' />
              {club.contact.phone}
            </Link>
          </div>
        </div>
      </DialogFooter>
    </>
  );
}
