import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { MatchEntity } from '../../../domain/entities/match.entity';
import { MatchRepository } from '../../../domain/repositories/match.repository';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import club from '../../../shared/config/club';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { CreateMatchDTO } from '../../dtos/match.dto';
import { BaseUseCase } from '../BaseUseCase';

const MatchSchema = z.object({
  teamId: z.string(),
  nomEquipe2: z.string(),
  date: z.string(),
  horaire: z.number(),
  salle: z.string(),
  arbitre1: z.string().optional(),
  arbitre2: z.string().optional(),
  marqueur: z.string().optional(),
  chronometreur: z.string().optional(),
});
type Match = z.infer<typeof MatchSchema>;

export class CreateMatchUseCase implements BaseUseCase<Match, MatchEntity> {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async execute(input: unknown): Promise<MatchEntity> {
    try {
      const match = MatchSchema.parse(input);
      const team = await this.teamRepository.findById(match.teamId);
      if (!team) {
        throw new Error('Team not found');
      }
      const dto = this.DTO({ ...match, nomEquipe1: team.name });
      return await this.matchRepository.createWithTeam(dto);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }

  DTO(match: Match & { nomEquipe1: string }): CreateMatchDTO {
    return {
      id: uuidv4(),
      nom_equipe_1: match.nomEquipe1,
      nom_equipe_2: match.nomEquipe2,
      date: match.date,
      horaire: match.horaire,
      salle: match.salle,
      team_id: match.teamId,
      arbitre_1: match.arbitre1 ?? null,
      arbitre_2: match.arbitre2 ?? null,
      marqueur: match.marqueur ?? null,
      chronometreur: match.chronometreur ?? null,
      is_amical: true,
      code_match: null,
      numero: null,
      numero_journee: null,
      id_poule: null,
      id_organisme_equipe_1: club.clubId,
      id_organisme_equipe_2: null,
      id_engagement_equipe_1: null,
      id_engagement_equipe_2: null,
      resultat_equipe_1: null,
      resultat_equipe_2: null,
      date_saisie_resultat: null,
      creation: null,
      validee: null,
      remise: null,
      joue: null,
      handicap_1: null,
      handicap_2: null,
      modification: null,
      penalite_equipe_1: null,
      penalite_equipe_2: null,
      forfait_equipe_1: null,
      forfait_equipe_2: null,
      defaut_equipe_1: null,
      defaut_equipe_2: null,
      etat: null,
    };
  }
}
