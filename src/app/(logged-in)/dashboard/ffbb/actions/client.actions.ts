'use client';
import { useState } from 'react';
import { fetchClubs, fetchMatchs } from './server.actions';
import { fetchDataFromFbi } from './api.actions';

export const useActions = () => {
  const [isTransfering, setIsTransfering] = useState(false);

  const updateClubs = async () => {
    setIsTransfering(true);
    try {
      const { organismes } = await fetchDataFromFbi();
      await fetchClubs(organismes);
    } catch (err) {
      console.error('Error transferring clubs:', err);
    } finally {
      setIsTransfering(false);
    }

  };

  const updateMatch = async () => {
    try {
      setIsTransfering(true);
      const { competitions, matchs } = await fetchDataFromFbi();
      await fetchMatchs(matchs, competitions);
    } catch (err) {
      console.error('Error transferring matchs:', err);
    } finally {
      setIsTransfering(false);
    }
  };

  return {
    updateClubs,
    updateMatch,
    isTransfering,
  };
};
