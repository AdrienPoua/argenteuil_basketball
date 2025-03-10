'use server';
import { validateUser } from '@/lib/api/validateUser';
// Check if the environment variables are set
const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD are not set');
}

const endpoint = 'https://ffbbserver3.ffbb.com/ffbbserver3/api/authentication.ws';

// Fonction pour obtenir le token
async function getToken() {
  await validateUser();
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    },
    body: JSON.stringify({
      userName: FFBB_SERVER_USERNAME,
      password: FFBB_SERVER_PASSWORD,
    }),
    // Très important: cache avec revalidation en arrière-plan
    next: {
      revalidate: 0, // Revalider après 55 minutes (avant expiration)
      tags: ['ffbb-token'], // Tag pour invalidation manuelle si nécessaire
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération du token: ${res.status}`);
  }

  return await res.text();
}

export default getToken;
