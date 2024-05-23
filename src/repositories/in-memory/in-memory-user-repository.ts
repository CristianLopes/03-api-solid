import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: Prisma.UserCreateInput) {
    const newUser: User = {
      id: '123',
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      created_at: new Date(),
    }

    this.items.push(newUser)

    return newUser
  }
}
