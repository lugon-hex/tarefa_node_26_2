import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'

type ListProjectUseCaseResponse = {
  projects: Project[]
}

export class ListProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}
  async execute(): Promise<ListProjectUseCaseResponse> {
    const projects = await this.projectsRepository.list()

    return { projects }
  }
}
