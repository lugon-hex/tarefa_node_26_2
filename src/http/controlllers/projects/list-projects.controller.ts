import type { FastifyReply, FastifyRequest } from 'fastify'
import { ProjectAlreadyExistsError } from '@/use-cases/errors/project-already-exists-error.js'
import { makeListUseCase } from '@/use-cases/projects/factories/make-list-projects.js'
import { ProjectPresenter } from '../presenters/project-presenter.js'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listProjectUseCase = makeListUseCase()
    const { projects } = await listProjectUseCase.execute()

    return reply.status(201).send(ProjectPresenter.toHTTP(projects))
  } catch (error) {
    if (error instanceof ProjectAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
