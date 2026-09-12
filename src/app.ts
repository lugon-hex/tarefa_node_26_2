import fastify from 'fastify'
import { appRoutes } from './http/controlllers/routes.js'
import { ZodError } from 'zod'
import { env } from './env/index.js';
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {secret: env.JWT_SECRET,})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message:
        'Problema Encontrado!!: O corpo da requisicao nao esta em formato JSON valido. Verifique a estrutura dos dados enviados',
    })
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
