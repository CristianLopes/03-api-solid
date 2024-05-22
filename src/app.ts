import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

export const app = fastify()

const prisma = new PrismaClient()

prisma.$connect().then(() => {
  console.log('prisma connected ')
  //   prisma.user
  //     .create({
  //       data: {
  //         name: 'Cristian Diego',
  //         email: 'cristian@gmail.com',
  //       },
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
})
