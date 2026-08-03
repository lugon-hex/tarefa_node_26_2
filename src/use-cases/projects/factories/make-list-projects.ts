import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { ListProjectUseCase } from '../list-projects.js'

export function makeListUseCase() {
  const ProjectRepository = new PrismaProjectsRepository()
  const listProjectUseCase = new ListProjectUseCase(ProjectRepository)

  return listProjectUseCase
}
