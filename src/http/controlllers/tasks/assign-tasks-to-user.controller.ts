import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeAssignUsersToTaskUseCase } from '@/use-cases/tasks/factories/make-assign-tasks-to-user.js'
import { TaskPresenter } from '../presenters/task-presenter.js'

export async function assignUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const bodySchema = z.object({
      userIds: z.array(z.number()).min(1),
    })

    const { id } = paramsSchema.parse(request.params)
    const { userIds } = bodySchema.parse(request.body)

    const assignUsersUseCase = makeAssignUsersToTaskUseCase()

    const { task } = await assignUsersUseCase.execute({
      taskPublicId: id,
      userIds,
    })

    return reply.status(200).send(TaskPresenter.toHTTP(task))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
