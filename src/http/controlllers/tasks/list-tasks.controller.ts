import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeListUseCase } from '@/use-cases/tasks/factories/make-list-task.js'
import { TaskPresenter } from '../presenters/task-presenter.js'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    completed: z.coerce.boolean().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    sort: z
      .enum(['id', 'title', 'priority', 'deadline', 'createdAt', 'updatedAt'])
      .optional(),
    order: z.enum(['asc', 'desc']).optional(),
  })

  const filters = querySchema.parse(request.query)
  const listTasksUseCase = makeListUseCase()
  const { tasks } = await listTasksUseCase.execute(filters)

  return reply.status(200).send(TaskPresenter.toHTTP(tasks))
}
