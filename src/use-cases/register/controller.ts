import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from './factory'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string().min(3, 'Name must contain at least 3 characters'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
  })

  const { name, email, password } = registerUserSchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
