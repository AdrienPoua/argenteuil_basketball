import { DocumentRepository } from '../../../domain/repositories/document.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class DeleteDocumentUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.documentRepository.delete(id)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
