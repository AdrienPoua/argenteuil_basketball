import { z } from "zod"
import { MemberEntity, MemberRole } from "../../../domain/entities/member.entity"
import { MemberRepository } from "../../../domain/repositories/member.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"
import { BaseUseCase } from "../BaseUseCase"

const UpdateMemberUseCaseInputSchema = z
  .object({
    id: z.string(),
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
    role: z.array(z.nativeEnum(MemberRole)),
    contact_privacy: z.object({
      showEmail: z.boolean(),
      showPhone: z.boolean(),
    }),
    created_at: z.string(),
  })
  .transform(({ contact_privacy, firstName, lastName, ...data }) => ({
    ...data,
    contact_privacy: contact_privacy,
    first_name: firstName,
    last_name: lastName,
  }))

type UpdateMemberUseCaseInput = z.infer<typeof UpdateMemberUseCaseInputSchema>

export class UpdateMemberUseCase implements BaseUseCase<UpdateMemberUseCaseInput, MemberEntity> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(input: unknown): Promise<MemberEntity> {
    try {
      const data = UpdateMemberUseCaseInputSchema.parse(input)
      const member = await this.memberRepository.update(data)
      return member
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
