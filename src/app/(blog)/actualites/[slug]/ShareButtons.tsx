'use client';

import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: Readonly<ShareButtonsProps>) {
  const { toast } = useToast();
  const url = `https://argenteuilbasketball.com/actualites/${slug}`;

  const shareData = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Découvrez cet article: ${url}`)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: 'Lien copié!',
          description: "Le lien de l'article a été copié dans votre presse-papiers.",
        });
      },
      (err) => {
        console.error('Impossible de copier le texte: ', err);
        toast({
          title: 'Erreur',
          description: 'Impossible de copier le lien.',
          variant: 'destructive',
        });
      },
    );
  };

  return (
    <div className='flex flex-wrap items-center justify-end gap-3'>
      <a href={shareData.facebook} target='_blank' rel='noopener noreferrer' aria-label='Partager sur Facebook'>
        <Button size='sm' className='rounded-full p-2'>
          <Facebook className='h-5 w-5' />
        </Button>
      </a>

      <a href={shareData.twitter} target='_blank' rel='noopener noreferrer' aria-label='Partager sur Twitter'>
        <Button size='sm' className='rounded-full p-2'>
          <Twitter className='h-5 w-5' />
        </Button>
      </a>

      <a href={shareData.linkedin} target='_blank' rel='noopener noreferrer' aria-label='Partager sur LinkedIn'>
        <Button size='sm' className='rounded-full p-2'>
          <Linkedin className='h-5 w-5' />
        </Button>
      </a>

      <a href={shareData.email} aria-label='Partager par email'>
        <Button size='sm' className='rounded-full p-2'>
          <Mail className='h-5 w-5' />
        </Button>
      </a>

      <Button size='sm' className='rounded-full p-2' onClick={copyToClipboard} aria-label='Copier le lien'>
        <LinkIcon className='h-5 w-5' />
      </Button>
    </div>
  );
}
