import type {
  ListTaskQuery,
  TasksRepository,
} from '@/repositories/tasks-repository.js'

export class ListTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}
  async execute(filters: ListTaskQuery) {
    const tasks = await this.tasksRepository.list(filters)
    return { tasks }
  }
}
