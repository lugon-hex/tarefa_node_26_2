import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'
import { projectsReport } from './projects.controller.js'

export async function reportsRoutes(app: FastifyInstance) {
  app.get(
    '/projects',
    {
      onRequest: [verifyJwt, verifyUserRole(['ADMIN'])],
    },
    projectsReport,
  )
}