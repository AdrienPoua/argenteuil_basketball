import { TeamDTO } from "./team.dto"

export interface MatchDTO {
  // REQUIRED
  id: string
  nom_equipe_1: string
  nom_equipe_2: string
  date: string
  horaire: number
  salle: string
  created_at: string
  is_amical: boolean
  // OPTIONAL
  numero: number | null
  numero_journee: number | null
  id_poule: number | null
  id_organisme_equipe_1: number | null
  id_organisme_equipe_2: number | null
  id_engagement_equipe_1: number | null
  id_engagement_equipe_2: number | null
  resultat_equipe_1: number | null
  resultat_equipe_2: number | null
  penalite_equipe_1: boolean | null
  penalite_equipe_2: boolean | null
  forfait_equipe_1: boolean | null
  forfait_equipe_2: boolean | null
  defaut_equipe_1: boolean | null
  defaut_equipe_2: boolean | null
  validee: boolean | null
  remise: boolean | null
  joue: boolean | null
  handicap_1: number | null
  handicap_2: number | null
  date_saisie_resultat: string | null
  creation: string | null
  modification: string | null
  code_match: string | null
  etat: string | null
  // added by us
  team: TeamDTO | null
  arbitre_1: string | null
  arbitre_2: string | null
  marqueur: string | null
  chronometreur: string | null
}
