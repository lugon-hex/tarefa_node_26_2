import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeListTasksByProjectUseCase } from '@/use-cases/projects/factories/make-list-taks.js'
import { TaskPresenter } from '../presenters/task-presenter.js'

export async function listTasksByProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const { id } = paramsSchema.parse(request.params)

    const useCase = makeListTasksByProjectUseCase()

    const { tasks } = await useCase.execute({
      projectPublicId: id,
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
