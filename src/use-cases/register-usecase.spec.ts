/* eslint-disable prettier/prettier */
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register-usecase'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('Should be able to register', async () => {
    const repository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(repository)

    const password = '123456'
    const { user } = await registerUseCase.execute({
      name: 'Cristian',
      email: 'cristian@gmail.com',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const repository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(repository)

    const password = '123456'
    const { user } = await registerUseCase.execute({
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
    const repository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(repository)

    const password = '123456'
    await registerUseCase.execute({
      name: 'Cristian',
      email: 'cristian@gmail.com',
      password,
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Cristian',
        email: 'cristian@gmail.com',
        password,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
