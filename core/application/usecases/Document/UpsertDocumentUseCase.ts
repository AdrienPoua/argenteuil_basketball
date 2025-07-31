import { z } from 'zod'
import { DocumentEntity } from '../../../domain/entities/document.entity'
import { DocumentRepository } from '../../../domain/repositories/document.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const UpsertDocumentUseCaseInputSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  size: z.number(),
  url: z.string(),
  created_at: z.string().optional(),
})

type UpsertDocumentUseCaseInput = z.infer<typeof UpsertDocumentUseCaseInputSchema>

export class UpsertDocumentUseCase
  implements BaseUseCase<UpsertDocumentUseCaseInput, DocumentEntity>
{
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(input: unknown): Promise<DocumentEntity> {
    try {
      const data = UpsertDocumentUseCaseInputSchema.parse(input)
      return await this.documentRepository.upsert(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
