'use client';

import { ExternalLink, Mail, Phone, Trophy, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/core//presentation/hooks/divers/use-mobile';
import club from '@/core/shared/config/club';

type MenuType = 'none' | 'contact' | 'links';

interface ContactItem {
  icon: typeof Phone | typeof Mail;
  label: string;
  value: string;
  href?: string;
}

interface QuickLink {
  icon: typeof ExternalLink | typeof Users | typeof Trophy;
  label: string;
  value: string;
  href: string;
}

// Configuration des données
const getContactItems = (isMobile: boolean): ContactItem[] => [
  {
    icon: Phone,
    label: club.contact.name,
    value: club.contact.phone,
    href: isMobile ? `tel:${club.contact.phone}` : undefined,
  },
  {
    icon: Mail,
    label: isMobile ? 'Envoyer un email' : club.contact.email,
    value: club.contact.email,
    href: `mailto:${club.contact.email}`,
  },
];

const quickLinks: QuickLink[] = [
  {
    icon: ExternalLink,
    label: 'FFBB',
    value: 'Fédération Française de Basket',
    href: club.pageFFBB,
  },
  {
    icon: ExternalLink,
    label: 'Ligue',
    value: 'Ligue de basket IDF',
    href: club.pageLigue,
  },
  {
    icon: Users,
    label: 'Comité',
    value: 'Le comité du 78',
    href: club.pageComite,
  },
  {
    icon: Trophy,
    label: 'Résultats',
    value: 'Matchs & Classements',
    href: club.pageResultat,
  },
];

// Composant menu principal

export default function ProfessionalFloatingMenu() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('none');
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (activeMenu === 'none') return;
    const timeout = setTimeout(() => setActiveMenu('none'), 8000);
    return () => clearTimeout(timeout);
  }, [activeMenu]);

  return (
    <div className='fixed bottom-8 right-8 z-50'>
      <div ref={containerRef} className='flex flex-col items-end space-y-4'>
        <AnimatePresence>
          {activeMenu !== 'none' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='min-w-[280px] rounded-xl border border-gray-200 bg-white p-2 shadow-2xl'
            >
              <div className='p-3'>
                <h3 className='text-sm font-semibold text-gray-800'>
                  {activeMenu === 'contact' ? 'Informations de contact' : 'Liens rapides'}
                </h3>
              </div>
              <div className='space-y-1 p-2'>
                {(activeMenu === 'contact' ? getContactItems(isMobile) : quickLinks).map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='group flex items-center justify-between rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50'
                  >
                    <div className='flex w-full items-center space-x-3 border-2 border-transparent px-3 py-2 hover:border-primary hover:bg-primary/10'>
                      <div className='rounded-lg bg-gray-100 p-2 transition-colors'>
                        <item.icon className='h-4 w-4 text-primary' />
                      </div>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>{item.label}</div>
                        <div className='text-xs text-gray-500'>{item.value}</div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex space-x-3'>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeMenu === 'contact' ? 'default' : 'outline'}
              className='h-12 rounded-lg bg-secondary px-4 font-medium text-background shadow-lg hover:bg-secondary/80 hover:font-bold hover:text-background'
              onClick={() => setActiveMenu(activeMenu === 'contact' ? 'none' : 'contact')}
            >
              <Phone className='mr-2 h-4 w-4' />
              Contact
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeMenu === 'links' ? 'default' : 'outline'}
              className='h-12 rounded-lg bg-secondary px-4 font-medium text-background shadow-lg hover:bg-secondary/80 hover:font-bold hover:text-background'
              onClick={() => setActiveMenu(activeMenu === 'links' ? 'none' : 'links')}
            >
              <ExternalLink className='mr-2 h-4 w-4' />
              Liens
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
