import { z } from 'zod';
import { FaqEntity } from '../../../domain/entities/faq.entity';
import { FaqRepository } from '../../../domain/repositories/faq.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

const UpsertFaqUseCaseInputSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(5, 'La question doit contenir au moins 5 caractères'),
  answer: z.string(),
  order: z.number().int().min(0, "L'ordre doit être un nombre positif"),
  created_at: z.string().optional(),
});

export class UpsertFaqUseCase implements BaseUseCase<unknown, FaqEntity> {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(input: unknown): Promise<FaqEntity> {
    try {
      const data = UpsertFaqUseCaseInputSchema.parse(input);
      return await this.faqRepository.upsert(data);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
