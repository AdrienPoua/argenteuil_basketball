import { z } from 'zod'
import { SessionEntity } from '../../../domain/entities/session.entity'
import { SessionRepository } from '../../../domain/repositories/session.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const CreateSessionUseCaseSchema = z
  .object({
    day: z.string(),
    start: z.string(),
    end: z.string(),
    gymnase_id: z.string(),
  })
  .transform((data) => ({
    ...data,
    gymnase_id: data.gymnase_id,
  }))

const CreateSessionUseCaseSchemaArray = z.array(CreateSessionUseCaseSchema)
type CreateSessionUseCaseInput = z.infer<typeof CreateSessionUseCaseSchemaArray>
export class CreateSessionUseCase
  implements BaseUseCase<CreateSessionUseCaseInput, SessionEntity[]>
{
  constructor(private readonly sessionRepository: SessionRepository) {}
  async execute(input: unknown): Promise<SessionEntity[]> {
    try {
      const data = CreateSessionUseCaseSchemaArray.parse(input)
      return this.sessionRepository.createMany(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
