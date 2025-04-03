// Script pour tester la fonction getToken depuis le terminal
require('dotenv').config(); // Charger les variables d'environnement
const { getToken } = require('../actions/fetchs/fbi/getToken');

async function main() {
  try {
    console.log('Tentative de connexion au FBI...');
    const token = await getToken();
    console.log('Connexion réussie!');
    console.log('Token/Cookies:', token);
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.message);
  }
}

main(); 