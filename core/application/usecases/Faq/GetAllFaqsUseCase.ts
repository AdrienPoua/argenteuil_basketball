import { FaqEntity } from "../../../domain/entities/faq.entity"
import { FaqRepository } from "../../../domain/repositories/faq.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"

export class GetAllFaqsUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(): Promise<FaqEntity[]> {
    try {
      const faqs = await this.faqRepository.findAll()
      return faqs.sort((a, b) => {
        return a.order - b.order
      })
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
