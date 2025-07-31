import { FaqRepository } from '../../../domain/repositories/faq.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class DeleteFaqUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.faqRepository.delete(id)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
