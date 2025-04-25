'use client';
import Team from '@/models/Team';
import Image from 'next/image';
import { Calendar, Trophy, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type PropsType = {
  data: ReturnType<Team['toPlainObject']>;
  index: number;
};

export default function TeamCard({ data, index }: Readonly<PropsType>): JSX.Element {
  const [imageOpen, setImageOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageOpen(true);
  };

  return (
    <>
      <div className='relative flex h-full w-full flex-col rounded-lg border border-muted bg-card shadow-md transition-all'>
        <Button
          variant='invisible'
          className='absolute inset-0 z-10 h-full w-full cursor-pointer overflow-hidden p-0'
          onClick={handleImageClick}
          title='Cliquez pour agrandir'
        >
          <span className='sr-only'>Voir l&apos;image en plein écran</span>
        </Button>
        {/* Image et en-tête */}
        <div className='relative h-52 w-full overflow-hidden rounded-t-lg'>
          <Image
            src={data.image || '/images/placeholder.png'}
            alt={data.name}
            fill
            className='absolute inset-0 object-cover object-center transition-transform duration-300'
            sizes='(max-width: 768px) 100vw, 350px'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/70' />
          <div className='absolute bottom-0 left-0 right-0 z-20 p-4'>
            <h3 className='text-xl font-bold text-white'>{data.name}</h3>

            {/* Badge de statut */}
            <div
              className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                data.isCompetition ? 'bg-amber-500/25 text-amber-500' : 'bg-secondary/25 text-secondary'
              }`}
            >
              {data.isCompetition ? (
                <Trophy size={12} className='mr-1' />
              ) : (
                <GraduationCap size={12} className='mr-1' />
              )}
              <span>{data.isCompetition ? 'En championnat' : 'École de basket'}</span>
            </div>
          </div>
        </div>

        {/* Contenu principal - Retiré flex-1 pour éviter l'espacement automatique */}
        <div className='p-4'>
          {/* Infos de championnat */}
          {data.isCompetition && data.championnats && data.championnats.length > 0 && (
            <div className='mb-3'>
              <span className='text-xs font-medium text-muted-foreground'>Championnats:</span>
              <div className='mt-1 flex flex-wrap gap-1'>
                {data.championnats.map((championnat, idx) => (
                  <span
                    key={idx + 'championnat'}
                    className='inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800'
                  >
                    {championnat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Panneau de détails avec les créneaux d'entraînement */}
          <div className='border-t border-border p-4'>
            {data.sessions && data.sessions.length > 0 && (
              <div>
                <h4 className='mb-2 flex items-center font-secondary text-sm font-semibold uppercase text-primary'>
                  <Calendar size={14} className='mr-1.5' />
                  Créneaux d&apos;entraînement
                </h4>
                <ul className='space-y-2'>
                  {data.sessions.map((session, idx) => (
                    <li key={idx + 'session'} className='rounded-md bg-primary/50 p-2 text-xs'>
                      {typeof session === 'string' ? (
                        session
                      ) : (
                        <span className='font-medium text-background'>
                          {session.day} - {session.start} - {session.end} - {session.gymnase?.replace('_', ' ')}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      </div>

      {/* Bouton de test pour vérifier si le Dialog fonctionne */}
      <div className='hidden'>
        <Button onClick={() => setImageOpen(true)}>Test Modal</Button>
      </div>

      {/* Modale d'image avec shadcn UI Dialog */}
      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className='p-0 sm:max-w-3xl'>
          <div className='relative'>
            <div className='relative h-[70vh]'>
              <Image
                src={data.image || '/images/placeholder.png'}
                alt={data.name}
                fill
                className='object-contain'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw'
                priority
              />
            </div>
            <div className='p-4 text-center'>
              <h3 className='text-xl font-bold'>{data.name}</h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
