import { z } from 'zod'
import { InscriptionRepository } from '@/core/domain/repositories/inscription.repository'
import { UpdateInscriptionDTO } from '@/core/infrastructure/supabase/dtos/inscription.dto'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

const inscriptionSchema = z.object({
  id: z.string(),
  last_name: z.string().min(2).optional(),
  first_name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone_number: z.string().min(8).optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(['Masculin', 'Féminin']).optional(),
  surclassement: z.boolean().optional(),
  status: z.enum(['EN_ATTENTE', 'TRAITEE', 'REJETEE']).optional(),
  type_inscription: z
    .enum(['RENOUVELLEMENT', 'MUTATION', 'NOUVELLE_LICENCE', 'RENOUVELLEMENT_SANS_MUTATION'])
    .optional(),
})

export class UpdateInscriptionUseCase {
  constructor(private readonly repository: InscriptionRepository) {}

  async execute(data: unknown) {
    try {
      const validatedData = inscriptionSchema.parse(data)
      const dto = this.DTO(validatedData)
      return await this.repository.update(dto)
    } catch (error) {
      const normalizedError = ErrorHandler.normalize(error)
      ErrorHandler.log(normalizedError)
      throw normalizedError
    }
  }

  private DTO(data: z.infer<typeof inscriptionSchema>): UpdateInscriptionDTO {
    return {
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email,
      phone_number: data.phone_number,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      type_inscription: data.type_inscription,
      surclassement: data.surclassement,
      status: data.status,
      id: data.id,
    }
  }
}
