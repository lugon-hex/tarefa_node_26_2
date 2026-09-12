import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeUpdateUseCase } from '@/use-cases/tasks/factories/make-update-task.js'
import { TaskPresenter } from '../presenters/task-presenter.js'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = updateParamsSchema.parse(request.params)

    const updateBodySchema = z.object({
      title: z.string().trim().min(1).max(100).optional(),
      description: z.string().max(1000).optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      completed: z.boolean().optional(),
      deadline: z.coerce.date().optional(),
    })

    const { title, description, priority, completed, deadline } =
      updateBodySchema.parse(request.body)

    const updateTaskUseCase = makeUpdateUseCase()

    const { task } = await updateTaskUseCase.execute({
      publicId,
      title,
      description,
      priority,
      completed,
      deadline,
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
