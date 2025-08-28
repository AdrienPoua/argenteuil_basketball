import { AuthError } from '@supabase/supabase-js'
import { UserEntity } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../domain/repositories/user.repository'
import { createClient } from '../clients/client'

export class SupabaseUserRepository implements UserRepository {
  private readonly supabaseClient = createClient()

  public async signIn(email: string, password: string): Promise<UserEntity | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      if (!data.user.email) return null

      return new UserEntity({
        id: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata?.role ?? 'user',
      })
    } catch (error) {
      throw this.handleError(error as AuthError)
    }
  }

  public async signOut(): Promise<void> {
    try {
      const { error } = await this.supabaseClient.auth.signOut()
      if (error) throw error
    } catch (error) {
      throw this.handleError(error as AuthError)
    }
  }

  public async getCurrentUser(): Promise<UserEntity | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.getSession()
      if (error) throw error

      if (!data.session?.user) return null

      const user = data.session.user
      return new UserEntity({
        id: user.id,
        email: user.email as string,
        role: user.user_metadata?.role ?? 'user',
      })
    } catch (error) {
      throw this.handleError(error as AuthError)
    }
  }

  private handleError(error: AuthError): Error {
    // Log the original error for debugging
    console.error('Supabase auth error:', error)

    // Map specific error codes to user-friendly messages
    switch (error.message) {
      case 'Invalid login credentials':
        return new Error('Identifiants invalides. Veuillez vérifier votre email et mot de passe.')

      case 'Email not confirmed':
        return new Error(
          "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception.",
        )

      case 'User not found':
        return new Error('Aucun utilisateur trouvé avec ces identifiants.')

      case 'Password recovery requires an email':
        return new Error(
          'Veuillez fournir une adresse email pour réinitialiser votre mot de passe.',
        )

      case 'Rate limit exceeded':
        return new Error('Trop de tentatives. Veuillez réessayer plus tard.')

      default:
        // Return a generic error message for unknown errors
        return new Error(
          `Erreur d'authentification: ${error.message ?? "Une erreur inconnue s'est produite"}`,
        )
    }
  }
}
