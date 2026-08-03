import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeRemoveUserFromTaskUseCase } from '@/use-cases/tasks/factories/make-remove-user-from-task.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

export async function removeUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.string(),
      userId: z.coerce.number(),
    })

    const { id, userId } = paramsSchema.parse(request.params)
    const removeUserUseCase = makeRemoveUserFromTaskUseCase()

    await removeUserUseCase.execute({ taskPublicId: id, userId })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
