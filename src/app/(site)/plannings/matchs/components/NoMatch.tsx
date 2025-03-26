import { CalendarOff } from 'lucide-react';

export default function NoMatch() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-lg border border-primary/20 bg-primary/10 p-6 text-center shadow-sm md:p-10'>
      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary md:h-20 md:w-20'>
        <CalendarOff className='h-8 w-8 md:h-10 md:w-10' />
      </div>
      <h2 className='text-xl font-bold text-primary md:text-2xl lg:text-3xl'>Saison terminée</h2>
      <p className='max-w-xl text-base text-slate-700 md:text-lg'>
        La saison est terminée, rendez-vous en septembre pour le début des championnats.
      </p>
    </div>
  );
}
