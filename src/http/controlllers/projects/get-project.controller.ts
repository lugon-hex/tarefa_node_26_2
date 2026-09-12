import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetUseCase } from '@/use-cases/projects/factories/make-get-project.js'
import { ProjectPresenter } from '../presenters/project-presenter.js'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = getParamsSchema.parse(request.params)

    const getProjectUseCase = makeGetUseCase()
    const { project } = await getProjectUseCase.execute({
      publicId,
    })

    return reply.status(200).send(ProjectPresenter.toHTTP(project))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
