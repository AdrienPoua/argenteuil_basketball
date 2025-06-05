const { FBI_EMAIL, FBI_PASSWORD } = process.env;

if (!FBI_EMAIL || !FBI_PASSWORD) {
  throw new Error('FBI_EMAIL and FBI_PASSWORD must be set');
}

export const getToken = async () => {
  try {
    // Créer les paramètres du formulaire au format correct pour le FBI
    const formData = new URLSearchParams();
    formData.append('identificationForm.identificationBean.identifiant', FBI_EMAIL);
    formData.append('identificationForm.identificationBean.mdp', FBI_PASSWORD);

    const response = await fetch('https://extranet.ffbb.com/fbi/connexion.fbi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/html,application/xhtml+xml,application/xml',
      },
      body: formData.toString(),
      redirect: 'follow',
      credentials: 'include', // Important pour maintenir la session
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with FBI');
    }

    const data = await response.json();

  } catch (error) {
    console.error("Erreur lors de l'authentification FBI - getToken - FBI ACTION:", error);
    throw error;
  }
};
