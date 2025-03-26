import { Inscription } from '@prisma/client';

export const getInscriptions = async (): Promise<Inscription[]> => {
  try {
    const response = await fetch('/api/inscriptions');

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des inscriptions');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching inscriptions:', error);
    throw error;
  }
};
