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

export const UpsertTeamUseCaseSchema = z.object({
  id: z.string().optional(),
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
  image: z.string().optional().nullable(),
  coachsIds: z.array(z.string()),
  assistantsCoachIds: z.array(z.string()),
  sessions: z.array(SessionSchema),
  competitions: z.array(
    z.object({ id: z.number(), label: z.string(), poules: z.array(z.object({ id: z.number(), nom: z.string() })) }),
  ),
  created_at: z.string().optional(),
});

type UpsertTeamUseCaseInput = z.infer<typeof UpsertTeamUseCaseSchema>;

export class UpsertTeamUseCase implements BaseUseCase<UpsertTeamUseCaseInput, TeamEntity> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(input: unknown): Promise<TeamEntity> {
    try {
      const data = UpsertTeamUseCaseSchema.parse(input);
      return await this.teamRepository.upsertWithRelations({
        ...data,
        sessions: data.sessions.map((session) => ({
          end: session.end,
          start: session.start,
          day: session.day,
          gymnase_id: session.gymnase_id,
        })),
      });
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
