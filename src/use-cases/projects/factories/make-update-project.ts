import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { UpdateProjectUseCase } from '../update-projects.js'

export function makeUpdateUseCase() {
  const ProjectRepository = new PrismaProjectsRepository()
  const updateProjectUseCase = new UpdateProjectUseCase(ProjectRepository)

  return updateProjectUseCase
}
