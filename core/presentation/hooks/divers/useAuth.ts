import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GetCurrentUserUseCase } from '@/core/application/usecases/User/GetCurrentUserUseCase'
import { LoginUseCase } from '@/core/application/usecases/User/LoginUseCase'
import { LogoutUseCase } from '@/core/application/usecases/User/LogoutUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getUser = async () => {
    setLoading(true)
    try {
      const userRepository = RepositoryFactory.getUserRepository()
      const useCase = new GetCurrentUserUseCase(userRepository)
      return await useCase.execute()
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userRepository = RepositoryFactory.getUserRepository()
      const useCase = new LoginUseCase(userRepository)
      const user = await useCase.execute({ email, password })
      router.push('/admin/dashboard')
      return user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      const userRepository = RepositoryFactory.getUserRepository()
      const useCase = new LogoutUseCase(userRepository)
      await useCase.execute()
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    login,
    logout,
    getUser,
  }
}
