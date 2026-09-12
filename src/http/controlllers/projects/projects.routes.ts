import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'
import { register } from './create-project.controller.js'
import { deleteProject } from './delete-project.controller.js'
import { get } from './get-project.controller.js'
import { list } from './list-projects.controller.js'
import { listTasksByProject } from './list-tasks.controller.js'
import { update } from './update-projects.controller.js'

export async function projectsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
    },
    register,
  )

  app.get(
    '/:publicId',
    {
      onRequest: [verifyJwt],
    },
    get,
  )

  app.get(
    '/',
    {
      onRequest: [verifyJwt],
    },
    list,
  )

  app.delete(
    '/publicId',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
    },
    deleteProject,
  )

  app.put(
    '/:publicId',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
    },
    update,
  )

  app.get(
    '/:id/tasks',
    {
      onRequest: [verifyJwt],
    },
    listTasksByProject,
  )
}
