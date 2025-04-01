'use client';
import Match from '@/models/Match';
import { useQuery } from 'react-query';
import { getMatchs } from '@/actions/fetchs/database/getMatchs';
import { useSearchParams } from 'next/navigation';
import { getChampionnats } from '@/actions/fetchs/database/getChampionnats';

export const useFilters = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  

  // Récupérer tous les paramètres
  const competition = params.get('competition') ?? undefined;
  const place = params.get('place') ?? undefined;
  const month = params.get('month') ?? undefined;
  const showUpcomingOnly = params.get('showUpcomingOnly') === 'true';

  // Définir une clé de requête qui change quand les paramètres changent
  const queryKey1 = ['matchs', month, competition, place, showUpcomingOnly];
  const queryKey2 = ['championnats'];

  const queryFn1 = async () => {
    const data = await getMatchs({
      month,
      competition,
      place,
      showUpcomingOnly,
    });
    return data.map((match) => new Match(match).toPlainObject());
  };
  const queryFn2 = async () => {
    return await getChampionnats();
  };

  const { data: matchs, isLoading } = useQuery(queryKey1, queryFn1);
  const { data: competitions } = useQuery(queryKey2, queryFn2);

  return {
    matchs,
    isLoading,
    competitions,
  };
};
