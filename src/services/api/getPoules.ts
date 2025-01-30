import HTTPRequest from '@/models/HTTPRequest';

export default async function fetchPoules(token: string) {
  const request = new HTTPRequest.Builder()
    .setUrl('/api/ffbb/getEngagements')
    .addHeader('Content-Type', 'application/json')
    .addHeader('Authorization', `Bearer ${token}`)
    .build();

  const data: Engagement[] = await request.send();
  return data.map((engagement) => engagement.idPoule);
}

interface Engagement {
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
  niveau: Niveau | null; // Peut être null
}

interface Niveau {
  id: number;
  code: string;
  libelle: string;
}
