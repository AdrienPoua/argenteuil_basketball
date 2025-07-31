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

export const CreateTeamUseCaseSchema = z.object({
  name: z.string(),
  category: z.array(
    z.nativeEnum(Category, {
      required_error: 'La catégorie est requise',
    }),
  ),
  gender: z.nativeEnum(Gender, {
    required_error: 'Le genre est requis',
  }),
  level: z.nativeEnum(Level, {
    required_error: 'Le niveau est requis',
  }),
  coachsIds: z.array(z.string()),
  image: z.string().optional(),
  assistantsCoachIds: z.array(z.string()),
  sessions: z.array(SessionSchema),
  competitions: z.array(
    z.object({ id: z.number(), label: z.string(), poules: z.array(z.object({ id: z.number(), nom: z.string() })) }),
  ),
});

type createTeamUseCaseSchema = z.infer<typeof CreateTeamUseCaseSchema>;

export class CreateTeamUseCase implements BaseUseCase<createTeamUseCaseSchema, TeamEntity> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(input: unknown): Promise<TeamEntity> {
    try {
      const data = CreateTeamUseCaseSchema.parse(input);
      return this.teamRepository.createWithRelations(data);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
