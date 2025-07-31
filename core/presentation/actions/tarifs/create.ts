'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { CreateTarifUseCase } from '@/core/application/usecases/Tarif/CreateTarifUseCase';
import { TarifCategory } from '@/core/domain/entities/tarif.entity';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

const CreateTarifUseCaseSchema = z.object({
  price: z.number().min(0, 'Le prix doit être positif'),
  min_age: z.number().min(0, "L'âge minimum doit être positif"),
  max_age: z.number().min(0, "L'âge maximum doit être positif"),
  category: z.nativeEnum(TarifCategory, {
    errorMap: () => ({ message: 'Catégorie invalide' }),
  }),
  mutation_price: z.number().min(0, 'Le prix de mutation doit être positif'),
});

export async function createTarif(input: unknown) {
  try {
    const data = CreateTarifUseCaseSchema.parse(input);
    const repository = RepositoryFactory.getTarifRepository();
    const createUseCase = new CreateTarifUseCase(repository);
    const entity = await createUseCase.execute(data);
    revalidatePath('/admin/gestion/tarifs');
    revalidatePath('/adhesion/tarifs');
    return entity.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
