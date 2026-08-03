import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeDeleteUseCase } from '@/use-cases/projects/factories/make-delete-project.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

export async function deleteProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = deleteParamsSchema.parse(request.params)

    const deleteProjectUseCase = makeDeleteUseCase()
    await deleteProjectUseCase.execute({
      publicId,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
