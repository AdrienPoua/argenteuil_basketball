'use server'
import { SendContactEmailUseCase } from '../../../application/usecases/Email/sendContactEmailUseCase'
import { ResendEmailRepository } from '../../../infrastructure/resend/repositories/ContactRepository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export const sendContactEmail = async (data: unknown) => {
  try {
    const repository = new ResendEmailRepository()
    const sendContactEmailUseCase = new SendContactEmailUseCase(repository)
    const result = await sendContactEmailUseCase.execute(data)
    return result
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
