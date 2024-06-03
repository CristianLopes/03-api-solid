/* eslint-disable prettier/prettier */
import { User } from '@prisma/client'
import { InvalidCredentials } from '../errors/invalid-credentials'
import { UserRepository } from '@/repositories/user-repository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export default class AuthenticateUseCase
  implements UseCase<AuthenticateUseCaseRequest, AuthenticateUseCaseResponse>
{
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentials()
    }

    return {
      user,
    }
  }
}
