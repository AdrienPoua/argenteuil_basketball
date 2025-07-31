import { z } from 'zod'
import { InscriptionRepository } from '@/core/domain/repositories/inscription.repository'
import { CreateInscriptionDTO } from '@/core/infrastructure/supabase/dtos/inscription.dto'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

const inscriptionSchema = z.object({
  lastName: z.string().min(2),
  firstName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(8),
  gender: z.enum(['Masculin', 'Féminin']),
  surclassement: z.boolean().default(false),
  typeInscription: z.enum([
    'RENOUVELLEMENT',
    'MUTATION',
    'NOUVELLE_LICENCE',
    'RENOUVELLEMENT_SANS_MUTATION',
  ]),
  dateOfBirth: z.string(),
  passSport: z.string().optional(),
})

export class CreateInscriptionUseCase {
  constructor(private readonly repository: InscriptionRepository) {}

  async execute(data: unknown) {
    try {
      const validatedData = inscriptionSchema.parse(data)
      const dto = this.DTO(validatedData)
      return await this.repository.create(dto)
    } catch (error) {
      const normalizedError = ErrorHandler.normalize(error)
      ErrorHandler.log(normalizedError)
      throw normalizedError
    }
  }

  private DTO(data: z.infer<typeof inscriptionSchema>): CreateInscriptionDTO {
    return {
      status: 'EN_ATTENTE',
      last_name: data.lastName,
      first_name: data.firstName,
      date_of_birth: data.dateOfBirth,
      phone_number: data.phoneNumber,
      gender: data.gender,
      type_inscription: data.typeInscription,
      email: data.email,
      surclassement: data.surclassement,
      passSport: data.passSport ?? '',
    }
  }
}
