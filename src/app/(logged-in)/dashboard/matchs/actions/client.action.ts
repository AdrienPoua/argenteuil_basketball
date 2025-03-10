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
  // --- État des filtres ---
  const [selectedCompetition, setSelectedCompetition] = useState('ALL');
  const [place, setPlace] = useState('all');
  const [month, setMonth] = useState('all');
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);

  // --- Données dérivées ---
  // Liste des compétitions uniques présentes dans les matchs
  const competitions = useMemo(() => {
    return Array.from(new Set(matchs.map((match) => match.championnat ?? 'Unknown')))
      .filter((competition) => competition !== '');
  }, [matchs]);

  // Liste des mois pour le filtre
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
    []
  );

  // --- Logique de filtrage ---
  const displayedGames = useMemo(() => {
    // Étape 1: Tri par date
    const sortedMatches = [...matchs].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Étape 2: Application des filtres
    return sortedMatches.filter(match => {
      // Filtre par compétition
      if (selectedCompetition !== 'ALL' && match.championnat !== selectedCompetition) {
        return false;
      }
      
      // Filtre par lieu (domicile/extérieur)
      if (place !== 'all') {
        const isHome = match.idOrganismeEquipe1 === ClubData.id;
        if ((place === 'home' && !isHome) || (place === 'away' && isHome)) {
          return false;
        }
      }
      
      // Filtre par mois
      if (month !== 'all') {
        const matchDate = new Date(match.date);
        const selectedMonthIndex = parseInt(month, 10);
        if (matchDate.getMonth() !== selectedMonthIndex) {
          return false;
        }
      }
      
      // Filtre pour matchs à venir uniquement
      if (showUpcomingOnly) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const matchDate = new Date(match.date);
        if (matchDate < today) {
          return false;
        }
      }
      
      // Si tous les filtres sont passés, on garde le match
      return true;
    });
  }, [matchs, selectedCompetition, place, month, showUpcomingOnly]);

  return {
    // États des filtres
    selectedCompetition,
    place,
    month,
    showUpcomingOnly,
    
    // Setters pour les filtres
    setSelectedCompetition,
    setPlace,
    setMonth,
    setShowUpcomingOnly,
    
    // Données filtrées et options de filtres
    displayedGames,
    competitions,
    months,
  };
};
