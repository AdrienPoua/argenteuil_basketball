import { errorHandler } from '@/lib/utils/handleApiError';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';

const { ORGANISMES: endpoint } = API_ENDPOINTS_FFBB;

const getClubs = async (token: string, competitionsIds: number[]) => {
  const clubs = await Promise.all(
    competitionsIds.map(async (id) => {
      try {
        const response = await fetch(endpoint + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) errorHandler(response.statusText, response.status);

        const data = (await response.json()) as CompetitionWithClassements[];
        const clubs = data
          .map((competition) => competition.classements.map((classemement) => classemement.organisme))
          .flat();
        const clubsWithStringId = clubs.map((organisme) => ({ ...organisme, id: organisme.id.toString() }));
        const filteredClubs = clubsWithStringId.filter(
          (organisme) => organisme.code && organisme.id && organisme.libelle,
        );
        return filteredClubs;
      } catch (error) {
        console.error(`Error fetching organismes: ${id}`, error);
        throw error;
      }
    }),
  );

  const uniqueClubs = Array.from(new Map(clubs.flat().map((club) => [club.id, club])).values());
  return uniqueClubs;
};

export default getClubs;

interface Competition {
  id: number;
  idCompetitionPere: number | null;
  nom: string;
  sexe: 'M' | 'F' | 'X'; // Masculin, Féminin ou Mixte
  categorie: {
    id: number;
    code: string;
    libelle: string;
  };
  code: string;
  fils: Competition[]; // Liste de compétitions filles si applicable
  saison: {
    id: number;
    code: string;
    libelle: string;
    debut: string; // Format "JJ/MM/AAAA"
    fin: string; // Format "JJ/MM/AAAA"
    actif: 'true' | 'false';
  };
  typeCompetition: string; // Exemple : "DIV" ou "PLAT"
  liveStat: boolean;
  creationEnCours: boolean;
  publicationInternet: string; // Exemple : "AFF"
  emarqueV2: boolean;
  classification: unknown;
  organisme: {
    id: number;
    libelle: string;
    code: string;
  };
  creation: string | null; // Date ou null
  modification: string | null; // Date ou null
  etat: unknown;
  poules: {
    id: number;
    nom: string;
  }[];
}
interface CompetitionWithClassements extends Competition {
  classements: {
    organisme: {
      id: number;
      libelle: string;
      code: string;
    };
    matchJoues: number;
    points: number;
    position: number;
    gagnes: number;
    perdus: number;
    nuls: number;
    pointsInitiaux: number | null;
    penalitesArbitrage: number;
    penalitesEntraineur: number;
    penalitesDiverses: number;
    nombreForfaits: number;
    nombreDefauts: number;
    paniersMarques: number;
    paniersEncaisses: number;
    quotient: number;
    difference: number;
    horsClassement: boolean;
  }[];
}
