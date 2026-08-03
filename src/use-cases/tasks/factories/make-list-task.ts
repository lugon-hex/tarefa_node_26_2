import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { ListTaskUseCase } from '../list-task.js'

export function makeListUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const listTaskUseCase = new ListTaskUseCase(taskRepository)

  return listTaskUseCase
}
