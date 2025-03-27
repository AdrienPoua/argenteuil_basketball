import { Competition } from '@/app/api/ffbb/competitions/route';

export const processCompetitions = (competitions: Competition[]) => {
  return competitions.map((compet) => ({ id: compet.id, label: compet.nom }));
};
