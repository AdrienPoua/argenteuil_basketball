import { z } from 'zod'
import { MatchEntity } from '../../../domain/entities/match.entity'
import { TeamEntity } from '../../../domain/entities/team.entity'
import { MatchRepository } from '../../../domain/repositories/match.repository'
import { TeamRepository } from '../../../domain/repositories/team.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { CreateMatchDTO } from '../../dtos/match.dto'
import { BaseUseCase } from '../BaseUseCase'

const MatchSchema = z.object({
  id: z.number(),
  numero: z.number(),
  numeroJournee: z.number(),
  idOrganismeEquipe1: z.number().nullable(),
  idOrganismeEquipe2: z.number().nullable(),
  nomEquipe1: z.string().nullable(),
  nomEquipe2: z.string().nullable(),
  idPoule: z.number().nullable(),
  idEngagementEquipe1: z.number().nullable(),
  idEngagementEquipe2: z.number().nullable(),
  resultatEquipe1: z.number().nullable(),
  resultatEquipe2: z.number().nullable(),
  date: z.string(),
  horaire: z.number(),
  salle: z
    .object({
      id: z.number(),
      numero: z.string(),
      libelle: z.string(),
    })
    .nullable(),
  penaliteEquipe1: z.boolean(),
  penaliteEquipe2: z.boolean(),
  forfaitEquipe1: z.boolean(),
  forfaitEquipe2: z.boolean(),
  defautEquipe1: z.boolean(),
  defautEquipe2: z.boolean(),
  validee: z.boolean(),
  remise: z.boolean(),
  joue: z.boolean(),
  handicap1: z.number().nullable(),
  handicap2: z.number().nullable(),
  dateSaisieResultat: z.string().nullable(),
  creation: z.string(),
  modification: z.string().nullable(),
  etat: z.string().optional(),
  codeMatch: z.string().optional(),
})

type Match = z.infer<typeof MatchSchema>

const MatchArraySchema = z.array(MatchSchema)

export class UpsertManyMatchsFromExtranetUseCase implements BaseUseCase<unknown, MatchEntity[]> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute(input: unknown): Promise<MatchEntity[]> {
    try {
      const matchs = MatchArraySchema.parse(input)
      const teams = await this.teamRepository.findAll()
      const filteredMatchs = matchs.filter(
        (m) =>
          !!m.idEngagementEquipe1 &&
          !!m.idEngagementEquipe2 &&
          !!m.salle &&
          !!m.nomEquipe1 &&
          !!m.nomEquipe2,
      )

      const dtos = filteredMatchs.map((m) => this.DTO(m))
      const matchsWithTeamId = await this.enhancedWithTeamId(dtos, teams)
      return this.matchRepository.upsertMany(matchsWithTeamId)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }

  DTO(match: Match): CreateMatchDTO {
    return {
      id: match.id.toString(),
      numero: match.numero,
      numero_journee: match.numeroJournee,
      id_organisme_equipe_1: match.idOrganismeEquipe1,
      id_organisme_equipe_2: match.idOrganismeEquipe2,
      nom_equipe_1: match.nomEquipe1 ?? '',
      nom_equipe_2: match.nomEquipe2 ?? '',
      id_poule: match.idPoule,
      id_engagement_equipe_1: match.idEngagementEquipe1,
      id_engagement_equipe_2: match.idEngagementEquipe2,
      resultat_equipe_1: match.resultatEquipe1,
      resultat_equipe_2: match.resultatEquipe2,
      date: match.date,
      horaire: match.horaire,
      salle: match.salle?.libelle as string,
      arbitre_1: null,
      arbitre_2: null,
      marqueur: null,
      chronometreur: null,
      is_amical: false,
      team_id: null,
      code_match: null,
      validee: false,
      remise: false,
      joue: false,
      creation: match.creation,
      modification: match.modification,
      etat: match.etat ?? null,
      handicap_1: match.handicap1,
      handicap_2: match.handicap2,
      date_saisie_resultat: match.dateSaisieResultat,
      penalite_equipe_1: match.penaliteEquipe1,
      penalite_equipe_2: match.penaliteEquipe2,
      forfait_equipe_1: match.forfaitEquipe1,
      forfait_equipe_2: match.forfaitEquipe2,
      defaut_equipe_1: match.defautEquipe1,
      defaut_equipe_2: match.defautEquipe2,
    }
  }

  async enhancedWithTeamId(
    matchs: CreateMatchDTO[],
    teams: TeamEntity[],
  ): Promise<CreateMatchDTO[]> {
    // Map pouleId => teamId pour accès rapide
    const pouleToTeamMap = new Map<number, string>()

    for (const team of teams) {
      for (const competition of team.competitions) {
        for (const poule of competition.poules) {
          pouleToTeamMap.set(poule.id, team.id)
        }
      }
    }
    // Transformer les matchs
    return matchs.map((match) => ({
      ...match,
      team_id: match.id_poule ? (pouleToTeamMap.get(match.id_poule) ?? null) : null,
    }))
  }
}
