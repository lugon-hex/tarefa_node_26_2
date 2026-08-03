import type { FastifyInstance } from 'fastify'

import { register } from './create-tasks.controller.js'
import { getTask } from './get-task.controller.js'
import { list } from './list-tasks.controller.js'
import { deleteTask } from './delete-tasks.controller.js'
import { update } from './update-tasks.controller.js'
import { removeUser } from './remove-user-from-task.js'

import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'
import { verifyTaskPermission } from '@/http/middlewares/verify-task-permission.js'

export async function tasksRoutes(app: FastifyInstance) {
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
    getTask,
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
    deleteTask,
  )

  app.put(
    '/:publicId',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
    },
    update,
  )

  app.delete(
    '/tasks/:id/assign/:userId',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
    },
    removeUser,
  )
}