import { MemberEntity, MemberRole } from '../../../domain/entities/member.entity';
import { MemberRepository } from '../../../domain/repositories/member.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class FindMemberByRoleUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(role: MemberRole): Promise<MemberEntity[]> {
    try {
      return await this.memberRepository.findByRole(role);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
