import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

export class GetCurrentUserUseCase implements BaseUseCase<void, UserEntity | null> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserEntity | null> {
    try {
      return await this.userRepository.getCurrentUser();
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
