'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PropsType, FormValues } from '../types/form.types';
import { formSchema } from '../schemas/form.schema';
import { useState, useMemo } from 'react';
import ClubData from '@/data/club.json';
import { PropsType as GridPropsType } from '../types/grid.types';

export const useMatchForm = (match: PropsType['match']) => {
  return useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: match.date.toISOString().split('T')[0],
      time: match.date.toLocaleTimeString(),
      salle: match.salle,
      isConvocationRecu: match.isConvocationRecu || false,
    },
  });
};

export const useCardFilter = (matchs: GridPropsType['matchs']) => {
  const [selectedCompetition, setSelectedCompetition] = useState('ALL');
  const [place, setPlace] = useState('all');
  const [month, setMonth] = useState('all');

  const competitions = useMemo(() => {
    return Array.from(new Set(matchs.map((match) => match.championnat ?? 'Unknown'))).filter(
      (competition) => competition !== '',
    );
  }, [matchs]);

  const sortedMatches = useMemo(() => {
    return [...matchs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [matchs]);

  const filteredByCompetition = useMemo(() => {
    return sortedMatches.filter((match) => match.championnat === selectedCompetition || selectedCompetition === 'ALL');
  }, [sortedMatches, selectedCompetition]);

  const homeGames = useMemo(() => {
    return filteredByCompetition.filter((match) => match.idOrganismeEquipe1 === ClubData.id);
  }, [filteredByCompetition]);

  const awayGames = useMemo(() => {
    return filteredByCompetition.filter((match) => match.idOrganismeEquipe1 !== ClubData.id);
  }, [filteredByCompetition]);

  const filteredByPlace = useMemo(() => {
    if (place === 'all') return filteredByCompetition;
    return place === 'home' ? homeGames : awayGames;
  }, [place, filteredByCompetition, homeGames, awayGames]);

  const displayedGames = useMemo(() => {
    if (month === 'all') return filteredByPlace;
    // Convertir le mois sélectionné en nombre (0-11)
    const selectedMonthIndex = parseInt(month, 10);
    return filteredByPlace.filter((match) => {
      const matchDate = new Date(match.date);
      return matchDate.getMonth() === selectedMonthIndex;
    });
  }, [month, filteredByPlace]);

  // Liste des mois de l'année
  const months = useMemo(
    () => [
      { value: '0', label: 'Janvier' },
      { value: '1', label: 'Février' },
      { value: '2', label: 'Mars' },
      { value: '3', label: 'Avril' },
      { value: '4', label: 'Mai' },
      { value: '5', label: 'Juin' },
      { value: '6', label: 'Juillet' },
      { value: '7', label: 'Août' },
      { value: '8', label: 'Septembre' },
      { value: '9', label: 'Octobre' },
      { value: '10', label: 'Novembre' },
      { value: '11', label: 'Décembre' },
    ],
    [],
  );

  return {
    selectedCompetition,
    place,
    month,
    setSelectedCompetition,
    setPlace,
    setMonth,
    displayedGames,
    competitions,
    months,
  };
};
