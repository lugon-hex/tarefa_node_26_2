import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import type { Project } from '@/@types/prisma/client.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateProjectUseCaseRequest {
  publicId: string
  name?: string
  description?: string
  status?: string
}

type UpdateProjectUseCaseResponse = {
  project: Project
}

export class UpdateProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    publicId,
    name,
    description,
    status,
  }: UpdateProjectUseCaseRequest): Promise<UpdateProjectUseCaseResponse> {
    const projectToUpdate = await this.projectsRepository.findBy({ publicId })

    if (!projectToUpdate) {
      throw new ResourceNotFoundError()
    }

    const project = await this.projectsRepository.update(projectToUpdate.id, {
      name,
      description,
      status,
    })

    return { project }
  }
}
