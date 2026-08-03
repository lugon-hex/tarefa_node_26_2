import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { DeleteProjectUseCase } from '../delete-project.js'

export function makeDeleteUseCase() {
  const ProjectRepository = new PrismaProjectsRepository()
  const deleteProjectUseCase = new DeleteProjectUseCase(ProjectRepository)

  return deleteProjectUseCase
}
