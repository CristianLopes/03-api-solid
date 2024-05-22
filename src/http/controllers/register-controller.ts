import { PrismaUserRepository } from '@/repositories/prisma-user-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string().min(3, 'Name must contain at least 3 characters'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
  })

  const { name, email, password } = registerUserSchema.parse(req.body)

  try {
    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
