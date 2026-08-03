import type { TasksRepository } from '@/repositories/tasks-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteTaskCaseRequest {
  publicId: string
}

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ publicId }: DeleteTaskCaseRequest) {
    const Task = await this.tasksRepository.findBy({ publicId })

    if (!Task) {
      throw new ResourceNotFoundError()
    }

    await this.tasksRepository.delete(Task.id)
  }
}
