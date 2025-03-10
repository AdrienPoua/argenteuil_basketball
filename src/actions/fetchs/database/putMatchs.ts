'use server';
import getMatchs from '@/actions/fetchs/ffbb/getMatchs';
import { authenticateAction } from '@/lib/actions/validateUser';
import saveMatchsToDatabase from '@/actions/process/saveMatchsToDatabase';

const sendMatchs = async () => {
  try {
    const matchs = await getMatchs();
    await saveMatchsToDatabase(matchs);
  } catch (error) {
    console.error('error in the server action sendMatchs', error);
    throw error;
  }
};

export default async function putMatchs() {
  try {
    // HOC qui vérifie si l'utilisateur est authentifié et appelle la fonction
    await authenticateAction(sendMatchs)();
  } catch (error) {
    console.error('error in the server action putMatchs', error);
    throw error;
  }
}
