import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { makeListUseCase } from '@/use-cases/users/factories/make-list-users.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUserUseCase = makeListUseCase()
    const { users } = await listUserUseCase.execute()

    return reply.status(201).send(UserPresenter.toHTTP(users))
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
