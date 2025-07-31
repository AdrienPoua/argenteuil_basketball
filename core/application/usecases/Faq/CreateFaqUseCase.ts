import { z } from "zod"
import { FaqEntity } from "../../../domain/entities/faq.entity"
import { FaqRepository } from "../../../domain/repositories/faq.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"
import { BaseUseCase } from "../BaseUseCase"

const CreateFaqUseCaseSchema = z.object({
  question: z.string(),
  answer: z.string(),
  order: z.number(),
})

type CreateFaqUseCaseInput = z.infer<typeof CreateFaqUseCaseSchema>
export class CreateFaqUseCase implements BaseUseCase<CreateFaqUseCaseInput, FaqEntity> {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(input: unknown): Promise<FaqEntity> {
    try {
      const data = CreateFaqUseCaseSchema.parse(input)
      return this.faqRepository.create(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
