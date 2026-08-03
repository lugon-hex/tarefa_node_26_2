import type { FastifyInstance } from 'fastify'
import { usersRoutes } from './users/users.routes.js'
import { projectsRoutes } from './projects/projects.routes.js'
import { tasksRoutes } from './tasks/tasks.routes.js';
import { reportsRoutes } from './reports/reports.routes.js';

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })

  app.register(projectsRoutes, { prefix: '/projects' })

  app.register(tasksRoutes, { prefix: '/tasks' })

  app.register(reportsRoutes, { prefix: '/reports' })
}
