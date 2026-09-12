import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetUseCase } from '@/use-cases/tasks/factories/make-get-task.js'
import { TaskPresenter } from '../presenters/task-presenter.js'

export async function getTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = getParamsSchema.parse(request.params)

    const getTaskUseCase = makeGetUseCase()

    const { task } = await getTaskUseCase.execute({
      publicId,
    })

    return reply.status(200).send(TaskPresenter.toHTTP(task))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
