import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from '../errors/resource-not-found'

interface GetUserProfileRequest {
  id: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase
  implements UseCase<GetUserProfileRequest, GetUserProfileResponse>
{
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFound()
    }

    return {
      user,
    }
  }
}
