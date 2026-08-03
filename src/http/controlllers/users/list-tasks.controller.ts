import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { TaskPresenter } from '../presenters/task-presenter.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeListTasksByUserUseCase } from '@/use-cases/users/factories/make-list-tasks.js'

export async function listTasksByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const { id } = paramsSchema.parse(request.params)

    const listTasksUseCase = makeListTasksByUserUseCase()

    const { tasks } = await listTasksUseCase.execute({
      userPublicId: id,
    })

    return reply.status(200).send(TaskPresenter.toHTTP(tasks))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
