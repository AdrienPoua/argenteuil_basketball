import { UserEntity } from "../../../domain/entities/user.entity"
import { UserRepository } from "../../../domain/repositories/user.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"
import { BaseUseCase } from "../BaseUseCase"

type LoginUseCaseInput = {
  email: string
  password: string
}

export class LoginUseCase implements BaseUseCase<LoginUseCaseInput, UserEntity | null> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: LoginUseCaseInput): Promise<UserEntity | null> {
    try {
      return await this.userRepository.signIn(input.email, input.password)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
