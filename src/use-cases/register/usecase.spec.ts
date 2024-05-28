/* eslint-disable prettier/prettier */
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './usecase'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UserRepository } from '@/repositories/user-repository'

let repository: UserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUserRepository()
    sut = new RegisterUseCase(repository)
  })

  it('Should be able to register', async () => {
    const password = '123456'
    const { user } = await sut.execute({
      name: 'Cristian',
      email: 'cristian@gmail.com',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const password = '123456'
    const { user } = await sut.execute({
      name: 'Cristian',
      email: 'cristian@gmail.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able register with same email twice', async () => {
    const password = '123456'
    await sut.execute({
      name: 'Cristian',
      email: 'cristian@gmail.com',
      password,
    })

    await expect(() =>
      sut.execute({
        name: 'Cristian',
        email: 'cristian@gmail.com',
        password,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
