import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetProjectUseCaseRequest {
  publicId: string
}

type GetProjectUseCaseResponse = {
  project: Project
}

export class GetProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    publicId,
  }: GetProjectUseCaseRequest): Promise<GetProjectUseCaseResponse> {
    const project = await this.projectsRepository.findBy({ publicId })

    if (!project) {
      throw new ResourceNotFoundError()
    }

    return { project }
  }
}
