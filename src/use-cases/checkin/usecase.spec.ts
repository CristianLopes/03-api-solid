import { describe, expect, it, beforeEach } from 'vitest'
import { CheckInUseCase } from './usecase'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let sut: CheckInUseCase
let checkInsRepository: CheckInsRepository

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
