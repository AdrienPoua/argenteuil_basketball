import { z } from 'zod'
import { MemberEntity, MemberRole } from '../../../domain/entities/member.entity'
import { MemberRepository } from '../../../domain/repositories/member.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const UpsertMemberUseCaseInputSchema = z
  .object({
    id: z.string().optional(),
    firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().optional(),
    phone: z.string().optional(),
    role: z.array(z.nativeEnum(MemberRole)),
    image: z.string().optional(),
    contact_privacy: z.object({
      showEmail: z.boolean(),
      showPhone: z.boolean(),
    }),
    created_at: z.string().optional(),
  })
  .transform(({ contact_privacy, firstName, lastName, ...data }) => ({
    ...data,
    contact_privacy: contact_privacy,
    first_name: firstName,
    last_name: lastName,
  }))

type UpsertMemberUseCaseInput = z.infer<typeof UpsertMemberUseCaseInputSchema>

export class UpsertMemberUseCase implements BaseUseCase<UpsertMemberUseCaseInput, MemberEntity> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(input: unknown): Promise<MemberEntity> {
    try {
      const data = UpsertMemberUseCaseInputSchema.parse(input)
      return await this.memberRepository.upsert(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
