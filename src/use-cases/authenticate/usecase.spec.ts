/* eslint-disable prettier/prettier */
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import AuthenticateUseCase from './usecase'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import { UserRepository } from '@/repositories/user-repository'

let repository: UserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(repository)
  })

  it('Should be able to authenticate', async () => {
    const password = '123456'
    const email = 'cristian@gmail.com'

    await repository.create({
      name: 'Cristian',
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'cristian@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const password = '123456'
    const email = 'cristian@gmail.com'

    await repository.create({
      name: 'Cristian',
      email,
      password_hash: await hash(password, 6),
    })

    expect(() =>
      sut.execute({
        email,
        password: password + '123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
