import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { RegisterTaskUseCase } from '../create-task.js'

export function makeRegisterUseCase() {
  const tasksRepository = new PrismaTaskRepository()
  const projectsRepository = new PrismaProjectsRepository()
  const registerTaskUseCase = new RegisterTaskUseCase(
    tasksRepository,
    projectsRepository,
  )
  return registerTaskUseCase
}
