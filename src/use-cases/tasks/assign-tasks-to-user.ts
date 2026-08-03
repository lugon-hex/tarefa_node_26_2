import type { TasksRepository } from '@/repositories/tasks-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface AssignUsersToTaskUseCaseRequest {
  taskPublicId: string
  userIds: number[]
}

export class AssignUsersToTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({ taskPublicId, userIds }: AssignUsersToTaskUseCaseRequest) {
    const task = await this.tasksRepository.findBy({
      publicId: taskPublicId,
    })

    if (!task) {
      throw new ResourceNotFoundError()
    }

    for (const userId of userIds) {
      const user = await this.usersRepository.findBy({
        id: userId,
      })
      if (!user) {
        throw new ResourceNotFoundError()
      }
    }

    const updatedTask = await this.tasksRepository.assignUsers(task.id, userIds)
    return { task: updatedTask }
  }
}
