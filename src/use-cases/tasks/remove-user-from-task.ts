import type { TasksRepository } from '@/repositories/tasks-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface RemoveUserFromTaskUseCaseRequest {
  taskPublicId: string
  userId: number
}

export class RemoveUserFromTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({ taskPublicId, userId }: RemoveUserFromTaskUseCaseRequest) {
    const task = await this.tasksRepository.findBy({
      publicId: taskPublicId,
    })
    if (!task) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.findBy({
      id: userId,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.tasksRepository.removeUser(task.id, user.id)
  }
}
