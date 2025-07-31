import { MemberEntity } from '../../../domain/entities/member.entity'
import { MemberRepository } from '../../../domain/repositories/member.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class FindDirigeantsUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(): Promise<MemberEntity[]> {
    try {
      const dirigeants = await this.memberRepository.findDirigeants()
      return dirigeants
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
