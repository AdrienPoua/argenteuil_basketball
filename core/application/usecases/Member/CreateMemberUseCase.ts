import { z } from 'zod'
import { MemberEntity, MemberRole } from '../../../domain/entities/member.entity'
import { MemberRepository } from '../../../domain/repositories/member.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const CreateMemberUseCaseInputSchema = z
  .object({
    firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    phone: z.string().min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres'),
    role: z.array(z.nativeEnum(MemberRole), {
      required_error: 'Le rôle est requis',
      message: 'Le rôle est requis',
    }),
    contact_privacy: z.object({
      showEmail: z.boolean(),
      showPhone: z.boolean(),
    }),
  })
  .transform(({ firstName, lastName, ...data }) => ({
    ...data,
    first_name: firstName,
    last_name: lastName,
  }))

type CreateMemberUseCaseInput = z.infer<typeof CreateMemberUseCaseInputSchema>

export class CreateMemberUseCase implements BaseUseCase<CreateMemberUseCaseInput, MemberEntity> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(input: unknown): Promise<MemberEntity> {
    try {
      const data = CreateMemberUseCaseInputSchema.parse(input)
      return this.memberRepository.create(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
