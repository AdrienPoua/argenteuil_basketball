'use server';

import { authOptions } from '@/integrations/nextAuth/auth';
import { getServerSession } from 'next-auth';

export async function connectedUserAction<T>(action: () => Promise<T>) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.error("L'utilisateur n'est pas authentifié");
      throw new Error('Non autorisé');
    }
    return action();
  } catch (error) {
    console.error("Erreur lors de l'exécution de l'action:", error);
    throw error;
  }
}
