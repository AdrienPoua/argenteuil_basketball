'use server'
import { SendReservationEmailUseCase } from '@/core/application/usecases/Email/sendReservationEmailUseCase'
import { MatchEntity } from '@/core/domain/entities/match.entity'
import { ResendEmailRepository } from '@/core/infrastructure/resend/repositories/ReservationRepository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export const sendReservationEmail = async (matchs: MatchEntity[]) => {
  try {
    const repository = new ResendEmailRepository()
    const sendReservationEmailUseCase = new SendReservationEmailUseCase(repository)
    const result = await sendReservationEmailUseCase.execute(matchs)
    return result
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
