import { z } from 'zod'
import { FaqEntity } from '../../../domain/entities/faq.entity'
import { FaqRepository } from '../../../domain/repositories/faq.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const UpdateFaqUseCaseInputSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  order: z.number(),
  created_at: z.string(),
})

type UpdateFaqUseCaseInput = z.infer<typeof UpdateFaqUseCaseInputSchema>
export class UpdateFaqUseCase implements BaseUseCase<UpdateFaqUseCaseInput, FaqEntity> {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(input: unknown): Promise<FaqEntity> {
    try {
      const data = UpdateFaqUseCaseInputSchema.parse(input)
      return this.faqRepository.update(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
