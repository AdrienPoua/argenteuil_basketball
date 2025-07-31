import { z } from 'zod';
import { Category, Gender, Level, TeamEntity } from '../../../domain/entities/team.entity';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

export const SessionSchema = z.object({
  start: z.string(),
  end: z.string(),
  day: z.string(),
  gymnase_id: z.string(),
});

export const UpdateTeamUseCaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.array(z.nativeEnum(Category)),
  gender: z.nativeEnum(Gender),
  level: z.nativeEnum(Level),
  image: z.string().optional(),
  coachsIds: z.array(z.string()),
  assistantsCoachIds: z.array(z.string()),
  sessions: z.array(SessionSchema),
  competitions: z.array(
    z.object({ id: z.number(), label: z.string(), poules: z.array(z.object({ id: z.number(), nom: z.string() })) }),
  ),
});

type UpdateTeamUseCaseInput = z.infer<typeof UpdateTeamUseCaseSchema>;

export class UpdateTeamUseCase implements BaseUseCase<UpdateTeamUseCaseInput, TeamEntity> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(input: unknown): Promise<TeamEntity> {
    try {
      const data = UpdateTeamUseCaseSchema.parse(input);
      return this.teamRepository.updateWithRelations(data.id, data);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
