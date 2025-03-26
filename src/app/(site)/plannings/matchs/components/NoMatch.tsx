import { CalendarOff } from 'lucide-react';

export default function NoMatch() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-lg bg-primary/10 border border-primary/20 p-6 md:p-10 text-center shadow-sm'>
      <div className='flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/20 text-primary'>
        <CalendarOff className='h-8 w-8 md:h-10 md:w-10' />
      </div>
      <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-primary'>Saison terminée</h2>
      <p className='text-base md:text-lg text-slate-700 max-w-xl'>
        La saison est terminée, rendez-vous en septembre pour le début des championnats.
      </p>
    </div>
  );
}
