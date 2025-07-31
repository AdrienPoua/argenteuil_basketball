import { z } from "zod"
import { DocumentEntity } from "../../../domain/entities/document.entity"
import { DocumentRepository } from "../../../domain/repositories/document.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"
import { BaseUseCase } from "../BaseUseCase"

const UpdateDocumentUseCaseInputSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.string(),
})

type UpdateDocumentUseCaseInput = z.infer<typeof UpdateDocumentUseCaseInputSchema>

export class UpdateDocumentUseCase implements BaseUseCase<UpdateDocumentUseCaseInput, DocumentEntity> {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(input: unknown): Promise<DocumentEntity> {
    try {
      const data = UpdateDocumentUseCaseInputSchema.parse(input)
      return this.documentRepository.update(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
