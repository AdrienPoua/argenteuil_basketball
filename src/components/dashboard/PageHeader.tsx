'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils/cn';

interface PageHeaderProps {
  className?: string;
}

export function PageHeader({ className }: PageHeaderProps) {
  const pathname = usePathname();

  // Créer les segments de breadcrumb à partir du chemin
  const segments = React.useMemo(() => {
    // Ignorer /dashboard au début
    const parts = pathname.split('/').filter((part) => part && part !== 'dashboard');

    // Générer les segments avec les chemins cumulatifs
    return parts.map((part, index) => {
      // Créer le chemin cumulatif jusqu'à ce segment
      const href = `/dashboard/${parts.slice(0, index + 1).join('/')}`;

      // Formater le nom pour l'affichage (première lettre majuscule, remplacer les tirets par des espaces)
      const name = part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return { name, href };
    });
  }, [pathname]);

  return (
    <div className={cn('mb-6', className)}>
      <Breadcrumb segments={segments} className='mb-2 text-foreground' />
      <h1 className='mx-auto w-fit rounded-lg border-2 border-foreground px-10 py-2 text-center font-secondary text-5xl font-bold text-foreground'>
        {segments.length > 0 ? segments[segments.length - 1].name : 'Dashboard'}
      </h1>
    </div>
  );
}
