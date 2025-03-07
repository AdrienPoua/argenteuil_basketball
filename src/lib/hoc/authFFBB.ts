import getToken from '@/actions/fetchs/ffbb/getToken';

/**
 * HOC qui ajoute l'authentification FFBB à la fonction fetch
 * @param fetchFn La fonction fetch à wrapper
 * @returns Une nouvelle fonction fetch authentifiée
 */
export function fetchWithFFBBToken(
  fetchFn: typeof fetch = fetch
) {
  return async (url: string, options: RequestInit = {}) => {
    try {
      // Récupération du token au moment de l'exécution
      const token = await getToken();
      
      // Fusion des headers existants avec le header d'autorisation
      const headers = new Headers(options.headers || {});
      headers.set('Authorization', `Bearer ${token}`);
      
      // Exécution de la requête avec les options fusionnées
      const response = await fetchFn(url, {
        ...options,
        headers
      });
      
      // Vérification de la réponse
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`FFBB API error (${response.status}): ${errorText}`, {
          cause: { status: response.status, statusText: response.statusText }
        });
      }
      
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'appel FFBB:', error);
      throw error;
    }
  };
} 