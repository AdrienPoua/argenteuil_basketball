import Card from './components/Card';
import clubService from '@/services/Club';
import Club from '@/models/Club';
import { AddCorrespondantModal } from './components/AddCorrespondantModal';

export default async function Index() {
  const clubs = await clubService.getClubs().then((clubs) => clubs.map((club) => new Club(club).toPlainObject()));
  return (
    <div className='container mx-auto flex flex-col gap-5'>
      <div className='mb-6 flex justify-end'>
        <AddCorrespondantModal />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {clubs?.toSorted((a, b) => a.code.localeCompare(b.code)).map((club) => (
          <Card key={club.id} data={club} />
        ))}
      </div>
    </div>
  );
}
