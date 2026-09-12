import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeUpdateUseCase } from '@/use-cases/users/factories/make-update-user.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = updateParamsSchema.parse(request.params)

    const updateBodySchema = z.object({
      name: z.string().trim().min(1).max(100),
      email: z.email().max(100),
      password: z.string().min(8).max(100),
    })

    const { name, email } = updateBodySchema.parse(request.body)

    const updateUserUseCase = makeUpdateUseCase()
    const { user } = await updateUserUseCase.execute({
      publicId,
      name,
      email,
    })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
