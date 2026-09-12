import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeDeleteUseCase } from '@/use-cases/tasks/factories/make-delete-task.js'

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const deleteParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = deleteParamsSchema.parse(request.params)

    const deleteTaskUseCase = makeDeleteUseCase()

    await deleteTaskUseCase.execute({
      publicId,
    })

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
