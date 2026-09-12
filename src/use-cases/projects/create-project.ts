import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'

interface RegisterProjectUseCaseRequest {
  name: string
  description?: string
  status: string
}

type RegisterProjectUseCaseResponse = {
  project: Project
}

export class RegisterProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}
  async execute({
    name,
    description,
    status,
  }: RegisterProjectUseCaseRequest): Promise<RegisterProjectUseCaseResponse> {
    const project = await this.projectsRepository.create({
      name,
      description,
      status,
    })

    return { project }
  }
}
