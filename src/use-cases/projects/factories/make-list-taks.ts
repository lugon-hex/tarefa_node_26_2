import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { ListTasksByProjectUseCase } from '../list-tasks.js'

export function makeListTasksByProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const tasksRepository = new PrismaTaskRepository()

  return new ListTasksByProjectUseCase(projectsRepository, tasksRepository)
}
