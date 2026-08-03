import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { UpdateTaskUseCase } from '../update-task.js'

export function makeUpdateUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository)

  return updateTaskUseCase
}
