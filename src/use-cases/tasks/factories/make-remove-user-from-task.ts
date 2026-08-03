import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RemoveUserFromTaskUseCase } from '../remove-user-from-task.js'

export function makeRemoveUserFromTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()
  const usersRepository = new PrismaUsersRepository()
  return new RemoveUserFromTaskUseCase(tasksRepository, usersRepository)
}
