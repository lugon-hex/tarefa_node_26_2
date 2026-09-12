import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeDeleteUseCase } from '@/use-cases/users/factories/make-delete-user.js'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const deleteParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = deleteParamsSchema.parse(request.params)

    const deleteUserUseCase = makeDeleteUseCase()
    await deleteUserUseCase.execute({
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
