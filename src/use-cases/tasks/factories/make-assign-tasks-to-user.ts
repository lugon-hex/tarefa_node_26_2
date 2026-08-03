import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { AssignUsersToTaskUseCase } from '../assign-tasks-to-user.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'

export function makeAssignUsersToTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()
  const usersRepository = new PrismaUsersRepository()

  return new AssignUsersToTaskUseCase(tasksRepository, usersRepository)
}
