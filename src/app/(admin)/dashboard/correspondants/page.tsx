'use ';
import Card from './components/Card';
import { ClubService } from '@/database/services/Club';
import Club from '@/models/Club';

export default async function Index() {
  const clubs = await new ClubService().getClubs().then((clubs) => clubs.map((club) => new Club(club).toPlainObject()));
  return (
    <div className='container mx-auto flex flex-col gap-5'>
      <div className='flex flex-wrap justify-center gap-5'>
        {clubs?.toSorted((a, b) => a.code.localeCompare(b.code)).map((club) => <Card key={club.id} data={club} />)}
      </div>
    </div>
  );
}
