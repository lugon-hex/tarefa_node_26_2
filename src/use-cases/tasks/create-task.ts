import type { Task } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import type { TasksRepository } from '@/repositories/tasks-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface RegisterTaskUseCaseRequest {
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  deadline?: Date
  projectPublicId: string
}

type RegisterTaskUseCaseResponse = {
  task: Task
}

export class RegisterTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}
  async execute({
    title,
    description,
    priority,
    deadline,
    projectPublicId,
  }: RegisterTaskUseCaseRequest): Promise<RegisterTaskUseCaseResponse> {
    const project = await this.projectsRepository.findBy({
      publicId: projectPublicId,
    })

    if (!project) {
      throw new ResourceNotFoundError()
    }

    const task = await this.tasksRepository.create({
      title,
      description,
      priority,
      deadline,

      project: {
        connect: {
          id: project.id,
        },
      },
    })

    return { task }
  }
}
