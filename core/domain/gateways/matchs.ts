export interface MatchGateway {
  getToken(): Promise<string>
  getMatchs(): Promise<Match[]>
  getPoulesIds(): Promise<number[]>
  getCompetitions(): Promise<Competition[]>
  getClubs(): Promise<Club[]>
}

interface Club {
  id: string
  libelle: string
  code: string
}

interface Competition {
  id: number
  label: string
  poules: {
    id: number
    nom: string
  }[]
}

export interface Match {
  id: number
  numero: number
  numeroJournee: number
  idPoule: number
  idOrganismeEquipe1: number | null
  idOrganismeEquipe2: number | null
  nomEquipe1: string | null
  nomEquipe2: string | null
  idEngagementEquipe1: number | null
  idEngagementEquipe2: number | null
  resultatEquipe1: number | null
  resultatEquipe2: number | null
  date: string
  horaire: number
  salle: { id: number; numero: string; libelle: string } | null
  penaliteEquipe1: boolean | null
  penaliteEquipe2: boolean | null
  forfaitEquipe1: boolean | null
  forfaitEquipe2: boolean | null
  defautEquipe1: boolean | null
  defautEquipe2: boolean | null
  validee: boolean | null
  remise: boolean | null
  joue: boolean | null
  handicap1: number | null
  handicap2: number | null
  dateSaisieResultat: string | null
  creation: string | null
  modification: string | null
  etat?: string
  codeMatch?: string
}
