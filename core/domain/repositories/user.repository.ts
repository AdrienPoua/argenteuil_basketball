import { UserEntity } from '../entities/user.entity'

export interface UserRepository {
  signIn(email: string, password: string): Promise<UserEntity | null>
  signOut(): Promise<void>
  getCurrentUser(): Promise<UserEntity | null>
}
