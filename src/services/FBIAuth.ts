/**
 * @fileoverview Service d'interaction avec l'extranet FBI de la FFBB.
 * Toutes les communications avec le serveur FBI se font en utilisant le format
 * application/x-www-form-urlencoded comme attendu par l'API.
 *
 * @note Ce service nécessite les variables d'environnement FBI_USERNAME et FBI_PASSWORD.
 */

export class FBIService {
  private readonly FBI_USERNAME = process.env.FBI_USERNAME;
  private readonly FBI_PASSWORD = process.env.FBI_PASSWORD;
  private readonly baseUrl = 'https://extranet.ffbb.com/fbi';
  private sessionId: string | null = null;

  async getToken(): Promise<string> {
    if (!this.FBI_USERNAME || !this.FBI_PASSWORD) {
      throw new Error('FBI_USERNAME ou FBI_PASSWORD non défini');
    }
    try {
      const formData = new URLSearchParams({
        'identificationForm.identificationBean.identifiant': this.FBI_USERNAME,
        'identificationForm.identificationBean.mdp': this.FBI_PASSWORD,
      });

      const response = await fetch(`${this.baseUrl}/identification.fbi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData.toString(),
        credentials: 'include', // Important pour récupérer les cookies
      });

      if (!response.ok) {
        throw new Error('Connexion à FBI échouée');
      }

      const cookies = response.headers.get('set-cookie');

      if (!cookies) {
        throw new Error('Aucun cookie trouvé');
      }

      // Extraire le JSESSIONID
      const regex = /JSESSIONID=([^;]+)/;
      const cookie = regex.exec(cookies);
      console.log('🚀 ~ FBIAuthService ~ login ~ cookie:', cookie);

      if (!cookie || !cookie[1]) {
        throw new Error('JSESSIONID non trouvé');
      }

      this.sessionId = cookie[1];
      return this.sessionId;
    } catch (error) {
      console.error('Erreur lors de la connexion à FBI:', error);
      throw error;
    }
  }

  /**
   @param adherentData.dateNaissance format "JJ/MM/AAAA"
   */

  async createLicense(
    adherentData: {
      nom: string;
      prenom: string;
      email: string;
      dateNaissance: string;
    },
    token: string,
  ): Promise<boolean> {
    try {
      // Construire le body avec les données de l'adhérent
      const formData = new URLSearchParams({
        'preinscriptionForm.creation': 'true',
        'preinscriptionForm.profilId': '86',
        'preinscriptionForm.preinscriptionGeneraliteBean.id': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.statut': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.typeOrganisme': 'G',
        'preinscriptionForm.anneeFinSaisonCourante': '2025',
        'preinscriptionForm.preinscriptionGeneraliteBean.dateValidationCmQsMineur': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.certificatIdentiqueSurclassement': '',
        typesPratiquePNombre: '0 ',
        typesPratiqueFNombre: '0 ',
        'preinscriptionForm.preinscriptionGeneraliteBean.idPhotographie': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.groupementId': '11851',
        'preinscriptionForm.preinscriptionGeneraliteBean.saisonId': '1035',
        'preinscriptionForm.preinscriptionGeneraliteBean.idLicence': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.nomLicence': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.mutation': '',
        '__checkbox_preinscriptionForm.preinscriptionGeneraliteBean.surclassement': 'true',
        '__checkbox_preinscriptionForm.preinscriptionGeneraliteBean.charteEngagement': 'true',
        'preinscriptionForm.preinscriptionGeneraliteBean.nom': adherentData.nom,
        'preinscriptionForm.preinscriptionGeneraliteBean.prenom': adherentData.prenom,
        'preinscriptionForm.preinscriptionGeneraliteBean.mail': adherentData.email,
        'preinscriptionForm.preinscriptionGeneraliteBean.nomNaissance':  '',
        'preinscriptionForm.preinscriptionGeneraliteBean.dateNaissance': adherentData.dateNaissance,
        'preinscriptionForm.preinscriptionGeneraliteBean.sexe': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.tarif': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.remise': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.lettreEntree': '',
        '__checkbox_preinscriptionForm.preinscriptionGeneraliteBean.lettreEntree': 'true',
        'preinscriptionForm.preinscriptionGeneraliteBean.idLettreEntree': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.validationLnb': '',
        'preinscriptionForm.preinscriptionGeneraliteBean.ageLicencie': '-1',
      });

      const response = await fetch(`${this.baseUrl}/enregistrerPreinscription.fbi?onglet=nav-generalite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: `JSESSIONID=${this.sessionId}`,
          Referer: 'https://extranet.ffbb.com/fbi/afficherPreinscription.fbi?id=0',
        },
        body: formData.toString(),
        credentials: 'include',
      });

      if (!response.ok) {
        console.error(`Erreur lors de la création de licence: ${response.status}`);
        return false;
      }

      // Vérifier si la création a réussi (selon la réponse attendue)
      const responseText = await response.text();
      return !responseText.includes('erreur') && !responseText.includes('Erreur');
    } catch (error) {
      console.error('Erreur lors de la création de la licence:', error);
      return false;
    }
  }
}

const service = new FBIService();

export default service;
