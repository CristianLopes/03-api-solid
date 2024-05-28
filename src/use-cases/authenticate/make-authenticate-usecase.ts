import { PrismaUserRepository } from '@/repositories/prisma-user-repository'
import AuthenticateUseCase from './authenticate-usecase'

export function makeAuthenticateUseCase() {
  const repository = new PrismaUserRepository()
  const usecase = new AuthenticateUseCase(repository)

  return usecase
}
