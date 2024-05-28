import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './usecase'
import { ResourceNotFound } from '../errors/resource-not-found'

let repository: InMemoryUserRepository
let sut: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(repository)
  })

  it('Should be able to get a user profile', async () => {
    const createdUser = await repository.create({
      name: 'test-user',
      email: 'test-user@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ id: createdUser.id })

    expect(user).toEqual(createdUser)
  })

  it('Should return resource not found when id not exists in database', async () => {
    await expect(async () => {
      await sut.execute({ id: '1' })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
