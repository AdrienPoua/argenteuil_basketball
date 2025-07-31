import { DocumentEntity } from '../../../domain/entities/document.entity'
import { DocumentRepository } from '../../../domain/repositories/document.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class GetAllDocumentsUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(): Promise<DocumentEntity[]> {
    try {
      return await this.documentRepository.findAll()
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
