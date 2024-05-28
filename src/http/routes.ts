import { authenticate } from '@/use-cases/authenticate/controller'
import { register } from '@/use-cases/register/controller'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
