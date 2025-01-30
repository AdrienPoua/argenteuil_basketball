import HTTPRequest from '@/models/HTTPRequest';

export default async function fetchRencontresParPoules(token: string, pouleIDS: number[]): Promise<MatchTransformed[]> {
  const request = new HTTPRequest.Builder()
    .setUrl('/api/ffbb/getRencontres')
    .setMethod('POST')
    .addHeader('Content-Type', 'application/json')
    .addHeader('Authorization', `Bearer ${token}`)
    .setBody(JSON.stringify(pouleIDS))
    .build();

  const data = await request.send();
  return data.map((match: Match) => {
    const date = new Date(match.date);
    const horaireStr = String(match.horaire).padStart(4, '0');
    const hours = parseInt(horaireStr.slice(0, 2), 10);
    const minutes = parseInt(horaireStr.slice(-2), 10);
    date.setHours(hours, minutes, 0, 0);
    return {
      ...match,
      date: date,
      salle: match.salle?.libelle || 'Salle non définie',
    };
  });
}

type Match = {
  id: number;
  numero: number;
  numeroJournee: number;
  idPoule: number;
  idOrganismeEquipe1: number;
  idOrganismeEquipe2: number;
  nomEquipe1: string;
  nomEquipe2: string;
  idEngagementEquipe1: number;
  idEngagementEquipe2: number;
  resultatEquipe1: number;
  resultatEquipe2: number;
  date: Date;
  horaire: string;
  salle: { id: number; numero: string; libelle: string };
  penaliteEquipe1: boolean;
  penaliteEquipe2: boolean;
  forfaitEquipe1: boolean;
  forfaitEquipe2: boolean;
  defautEquipe1: boolean;
  defautEquipe2: boolean;
  validee: boolean;
  remise: boolean;
  joue: boolean;
  handicap1: number | null;
  handicap2: number | null;
  dateSaisieResultat: string; // ISO 8601
  creation: string; // ISO 8601
  modification: string; // ISO 8601
  classementPouleAssociee: number | null;
};

type MatchTransformed = Omit<Match, 'horaire' | 'salle'> & { salle: string };
