import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { RegisterProjectUseCase } from '../create-project.js'

export function makeRegisterUseCase() {
  const ProjectsRepository = new PrismaProjectsRepository()
  const registerProjectUseCase = new RegisterProjectUseCase(ProjectsRepository)
  return registerProjectUseCase
}
