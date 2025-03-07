import { ClubSchema } from '@/lib/validation/Club';
import { z } from 'zod';
import { Organisme } from '@/app/api/ffbb/organismes/[id]/route';
import clubService from '@/services/Club';

const saveClubsToDatabase = async (organismes: Organisme[]) => {
  const clubs = z.array(ClubSchema).parse(organismes);
  await Promise.all(
    clubs.map(async (club) => {
      return await clubService.upsert(club);
    }),
  );
};

export default saveClubsToDatabase;
