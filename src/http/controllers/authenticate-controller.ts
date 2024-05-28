import { makeAuthenticateUseCase } from '@/use-cases/authenticate/make-authenticate-usecase'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
  })

  const { email, password } = authenticateUserSchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
