import type { TasksRepository } from '@/repositories/tasks-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface ListTasksByUserUseCaseRequest {
  userPublicId: string
}

export class ListTasksByUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository,
  ) {}
  async execute({ userPublicId }: ListTasksByUserUseCaseRequest) {
    const user = await this.usersRepository.findBy({
      publicId: userPublicId,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const tasks = await this.tasksRepository.findManyByUserId(user.id)

    return { tasks }
  }
}
