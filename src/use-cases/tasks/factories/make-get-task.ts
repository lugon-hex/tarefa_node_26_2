import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { GetTaskUseCase } from '../get-task.js'

export function makeGetUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const getTaskUseCase = new GetTaskUseCase(taskRepository)

  return getTaskUseCase
}
