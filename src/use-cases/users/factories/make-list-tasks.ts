import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ListTasksByUserUseCase } from '../list-tasks.js'

export function makeListTasksByUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const tasksRepository = new PrismaTaskRepository()
  return new ListTasksByUserUseCase(usersRepository, tasksRepository)
}
