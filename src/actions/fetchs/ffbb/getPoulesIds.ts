import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';

const { POULES: endpoint } = API_ENDPOINTS_FFBB;

const getPoulesIds = async (token: string) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error from FFBB: ${response.statusText}`);
    }

    const data: Engagement[] = await response.json();
    console.log("🚀 ~ getPoulesIds ~ data:", data)
    return data.map((data) => data.idPoule);
  } catch (error) {
    console.error('Erreur lors de la récupération des poules:', error);
    throw new Error('Erreur lors de la récupération des poules');
  }
};

export default getPoulesIds;

export interface Engagement {
  idEngagement: number;
  idOrganisme: number;
  idOrganismeCtc: number | null;
  nomEquipe: string | null;
  typeEntenteCtc: string | null;
  idLicenceCorrespondantEquipe: number;
  nomCorrespondantEquipe: string;
  adresseCorrespondantEquipe: string;
  complementAdresseCorrespondantEquipe: string;
  communeCorrespondantEquipe: string;
  telephoneFixeCorrespondantEquipe: string;
  telephoneTravailCorrespondantEquipe: string;
  telephonePortableCorrespondantEquipe: string;
  emailCorrespondantEquipe: string;
  clubPro: boolean;
  idCompetition: number;
  idPoule: number;
  numeroEquipe: string;
  niveau: {
    id: number;
    code: string;
    libelle: string;
  } | null;
}
