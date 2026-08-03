import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { GetProjectUseCase } from '../get-project.js'

export function makeGetUseCase() {
  const ProjectRepository = new PrismaProjectsRepository()
  const getProjectUseCase = new GetProjectUseCase(ProjectRepository)

  return getProjectUseCase
}
