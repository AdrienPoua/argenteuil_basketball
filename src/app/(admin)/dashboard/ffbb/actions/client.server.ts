'use client';
import { useQuery } from 'react-query';
import getPoules from '@/services/api/getPoules';
import getRencontresParPoules from '@/services/api/getRencontresParPoules';
import getCompetitions from '@/services/api/getCompetitions';
import getCompetitionsDetails from '@/services/api/getCompetitionsDetails';
import useToken from '@/hooks/useToken';

export function useFFBB() {
  const token = useToken();

  // Requête pour les poules
  const { data: poulesIDS } = useQuery(
    ['poulesID', token],
    () => getPoules(token!),
    { enabled: !!token }, // Exécute uniquement si le token est disponible
  );

  // Requête pour les compétitions
  const { data: competitions } = useQuery(['competitions', token], () => getCompetitions(token!), { enabled: !!token });

  // Requête pour les rencontres par poules
  const { data: matchs } = useQuery(
    ['rencontres', token, poulesIDS],
    () => getRencontresParPoules(token!, poulesIDS as number[]),
    { enabled: !!token && !!poulesIDS },
  );

  // Requête pour les détails des compétitions
  const { data: competitionsDetails } = useQuery(
    ['competitionsDetails', token, competitions],
    () => getCompetitionsDetails(token!, competitions?.map((compet) => compet.id) ?? []),
    { enabled: !!token && !!competitions },
  );

  return {
    poulesIDS,
    competitions,
    matchs,
    competitionsDetails,
  };
}
