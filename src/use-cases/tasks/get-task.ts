import type { Task } from '@/@types/prisma/client.js'
import type { TasksRepository } from '@/repositories/tasks-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetTaskUseCaseRequest {
  publicId: string
}

type GetTaskUseCaseResponse = {
  task: Task
}

export class GetTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    publicId,
  }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {
    const task = await this.tasksRepository.findBy({ publicId })

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return { task }
  }
}
