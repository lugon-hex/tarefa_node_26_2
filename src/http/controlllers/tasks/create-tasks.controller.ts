import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeRegisterUseCase } from '@/use-cases/tasks/factories/make-register-use-case.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      title: z.string().trim().min(1).max(100),
      description: z.string().trim().max(1000).optional(),
      priority: z.enum(['low', 'medium', 'high']),
      deadline: z.coerce.date().optional(),
      projectPublicId: z.string(),
    })

    const { title, description, priority, deadline, projectPublicId } =
      registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    const { task } = await registerUseCase.execute({
      title,
      description,
      priority,
      deadline,
      projectPublicId,
    })

    return reply.status(201).send(task)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
