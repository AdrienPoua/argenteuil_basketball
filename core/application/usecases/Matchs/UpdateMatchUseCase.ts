import { z } from 'zod'
import { MatchEntity } from '../../../domain/entities/match.entity'
import { MatchRepository } from '../../../domain/repositories/match.repository'
import { UpdateMatchDTO } from '../../../infrastructure/supabase/dtos/match.dto'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const MatchSchema = z
  .object({
    id: z.string(),
    nomEquipe1: z.string().optional(),
    nomEquipe2: z.string().optional(),
    date: z.string().optional(),
    horaire: z.number().optional(),
    salle: z.string().optional(),
    resultatEquipe1: z.number().optional(),
    resultatEquipe2: z.number().optional(),
    // officiels
    arbitre1: z.string().optional(),
    arbitre2: z.string().optional(),
    marqueur: z.string().optional(),
    chronometreur: z.string().optional(),
  })
  .strip()

type Match = z.infer<typeof MatchSchema>

export class UpdateMatchUseCase implements BaseUseCase<Match, MatchEntity> {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(input: unknown): Promise<MatchEntity> {
    try {
      const match = MatchSchema.parse(input)
      const persistence = this.DTO(match)
      return await this.matchRepository.update(persistence)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }

  DTO(match: Match): UpdateMatchDTO {
    return {
      id: match.id,
      nom_equipe_1: match.nomEquipe1,
      nom_equipe_2: match.nomEquipe2,
      resultat_equipe_1: match.resultatEquipe1,
      resultat_equipe_2: match.resultatEquipe2,
      date: match.date,
      horaire: match.horaire,
      salle: match.salle,
      // officiels
      arbitre_1: match.arbitre1,
      arbitre_2: match.arbitre2,
      marqueur: match.marqueur,
      chronometreur: match.chronometreur,
    }
  }
}
