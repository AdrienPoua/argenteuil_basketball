import { UserRepository } from '../../../domain/repositories/user.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

export class LogoutUseCase implements BaseUseCase<void, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<void> {
    try {
      return await this.userRepository.signOut();
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
