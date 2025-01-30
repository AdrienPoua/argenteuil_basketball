import HTTPRequest from '@/models/HTTPRequest';

export default async function fetchRanking(token: string, pouleIDS: number[]) {
  const request = new HTTPRequest.Builder()
    .setMethod('POST')
    .setUrl('/api/ffbb/getRanking')
    .addHeader('Content-Type', 'application/json')
    .addHeader('Authorization', `Bearer ${token}`)
    .setBody(JSON.stringify(pouleIDS))
    .build();

  const data = (await request.send()) as MatchStats[][];
  return data;
}

type MatchStats = {
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
  pointsInitiaux: number;
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
};
