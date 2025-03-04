'use client';
import { useState } from 'react';
import { updateClubs, updateMatchs } from './server.actions';
import { fetchDataFromFbi } from './api.actions';

export const useActions = () => {
  const [isTransfering, setIsTransfering] = useState(false);

  const majClubs = async () => {
    setIsTransfering(true);
    try {
      const { organismes } = await fetchDataFromFbi();
      await updateClubs(organismes);
    } catch (err) {
      console.error('Error transferring clubs:', err);
    } finally {
      setIsTransfering(false);
    }
  };

  const majMatchs = async () => {
    try {
      setIsTransfering(true);
      const { competitions, matchs } = await fetchDataFromFbi();
      await updateMatchs(matchs, competitions);
    } catch (err) {
      console.error('Error transferring matchs:', err);
    } finally {
      setIsTransfering(false);
    }
  };

  return {
    updateClubs: majClubs,
    updateMatch: majMatchs,
    isTransfering,
  };
};
