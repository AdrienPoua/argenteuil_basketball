import { MemberRepository } from '../../../domain/repositories/member.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class DeleteMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}
  async execute(id: string): Promise<void> {
    try {
      await this.memberRepository.delete(id);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
