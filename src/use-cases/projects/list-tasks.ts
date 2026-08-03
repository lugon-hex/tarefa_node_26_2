import type { TasksRepository } from '@/repositories/tasks-repository.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface ListTasksByProjectUseCaseRequest {
  projectPublicId: string
}

export class ListTasksByProjectUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private tasksRepository: TasksRepository,
  ) {}

  async execute({ projectPublicId }: ListTasksByProjectUseCaseRequest) {
    const project = await this.projectsRepository.findBy({
      publicId: projectPublicId,
    })

    if (!project) {
      throw new ResourceNotFoundError()
    }

    const tasks = await this.tasksRepository.findManyByProjectId(project.id)

    return { tasks }
  }
}
