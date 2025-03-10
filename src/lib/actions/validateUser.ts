import { authOptions } from '@/integrations/nextAuth/auth';
import { getServerSession } from 'next-auth';

export function authenticateAction<T>(action: () => Promise<T>) {
  return async (): Promise<T> => {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.error("L'utilisateur n'est pas authentifié");
      throw new Error('Non autorisé');
    }
    return action();
  };
}
