import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { DeleteTaskUseCase } from '../delete-task.js'

export function makeDeleteUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)

  return deleteTaskUseCase
}
