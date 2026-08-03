import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ProjectPresenter } from '../presenters/project-presenter.js'
import { makeUpdateUseCase } from '@/use-cases/projects/factories/make-update-project.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = updateParamsSchema.parse(request.params)

    const updateBodySchema = z.object({
      name: z.string().trim().min(1).max(100),
      description: z.string().min(50).max(1000),
      status: z.enum(['active', 'completed', 'cancelled']),
    })

    const { name, description, status } = updateBodySchema.parse(request.body)

    const updateProjectUseCase = makeUpdateUseCase()
    const { project } = await updateProjectUseCase.execute({
      publicId,
      name,
      description,
      status,
    })

    return reply.status(200).send(ProjectPresenter.toHTTP(project))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
