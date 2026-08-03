import type { Task } from '@/@types/prisma/client.js'
import type {
  TasksRepository,
  ListTaskQuery,
} from '@/repositories/tasks-repository.js'

type ListTaskUseCaseResponse = {
  tasks: Task[]
}

export class ListTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}
  async execute(filters: ListTaskQuery) {
    const tasks = await this.tasksRepository.list(filters)
    return { tasks }
  }
}
