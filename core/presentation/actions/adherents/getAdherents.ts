"use server"
import { ExtranetClient } from "@/core/infrastructure/extranet/client"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function getAdherents() {
  try {
    const client = new ExtranetClient()
    const adherents = await client.getAdherents()
    return adherents
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
