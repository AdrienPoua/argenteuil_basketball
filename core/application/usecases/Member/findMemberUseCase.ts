import { MemberEntity } from '../../../domain/entities/member.entity';
import { MemberRepository } from '../../../domain/repositories/member.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class FindMembersUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(): Promise<MemberEntity[]> {
    try {
      const members = await this.memberRepository.findMembers();
      return members;
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
