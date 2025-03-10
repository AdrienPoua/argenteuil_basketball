'use server';
import getOrganismes from '../ffbb/getOrganismes';
import { authenticateAction } from '@/lib/actions/validateUser';
import saveClubsToDatabase from '@/actions/process/saveClubsToDatabase';

const sendData = async () => {
  // Récupère les organismes de la base de données
  const organismes = await getOrganismes();
  // Envoie les organismes dans la base de données
  await saveClubsToDatabase(organismes);
};

export default async function updateClubs() {
  try {
    // HOC qui vérifie si l'utilisateur est authentifié et appelle la fonction
    await authenticateAction(sendData)();
  } catch (error) {
    console.error('Error updating clubs:', error);
    throw error;
  }
}
