import { PrismaUserRepository } from '@/repositories/prisma-user-repository'
import { RegisterUseCase } from './usecase'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
