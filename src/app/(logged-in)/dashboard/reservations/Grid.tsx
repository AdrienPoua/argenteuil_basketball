'use client';
import EmailHandler from './EmailHandler';
import Match from '@/models/Match';
import ReservationTemplate from '@/integrations/react-email/templates/Reservations';
type PropsType = {
  matchs: ReturnType<Match['toPlainObject']>[];
};

export default function Grid({ matchs }: Readonly<PropsType>) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='h-[600px] overflow-y-scroll rounded-md border'>
        <ReservationTemplate matches={matchs} />
      </div>
      <EmailHandler matchs={matchs} />
    </div>
  );
}
