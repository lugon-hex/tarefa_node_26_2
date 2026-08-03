import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ProjectAlreadyExistsError } from '@/use-cases/errors/project-already-exists-error.js'
import { makeRegisterUseCase } from '@/use-cases/projects/factories/make-register-use-case.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string().trim().min(1).max(100),
      description: z.string().min(50).max(1000),
      status: z.enum(['active', 'completed', 'cancelled']),
    })

    const { name, description, status } = registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    const { project } = await registerUseCase.execute({
      name,
      description,
      status,
    })

    return reply.status(201).send(project)
  } catch (error) {
    if (error instanceof ProjectAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
