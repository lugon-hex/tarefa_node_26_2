import type { TasksRepository } from '@/repositories/tasks-repository.js'
import type { Task } from '@/@types/prisma/client.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateTaskUseCaseRequest {
  publicId: string
  title?: string
  description?: string
  priority?: string
  completed?: boolean
  deadline?: Date
}

type UpdateTaskUseCaseResponse = {
  task: Task
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    publicId,
    title,
    description,
    priority,
    deadline,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const taskToUpdate = await this.tasksRepository.findBy({ publicId })

    if (!taskToUpdate) {
      throw new ResourceNotFoundError()
    }

    const task = await this.tasksRepository.update(taskToUpdate.id, {
      title,
      description,
      priority,
      deadline,
    })

    return { task }
  }
}
