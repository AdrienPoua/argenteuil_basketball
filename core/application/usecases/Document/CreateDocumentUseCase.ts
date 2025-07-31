import { z } from 'zod';
import { DocumentEntity } from '../../../domain/entities/document.entity';
import { DocumentRepository } from '../../../domain/repositories/document.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

const CreateDocumentUseCaseInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  size: z.number(),
  url: z.string(),
});

type CreateDocumentUseCaseInput = z.infer<typeof CreateDocumentUseCaseInputSchema>;

export class CreateDocumentUseCase implements BaseUseCase<CreateDocumentUseCaseInput, DocumentEntity> {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(input: unknown): Promise<DocumentEntity> {
    try {
      const data = CreateDocumentUseCaseInputSchema.parse(input);

      return this.documentRepository.create({
        title: data.title,
        description: data.description,
        url: data.url,
        size: data.size,
      });
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
