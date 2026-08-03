import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { GetProjectsReportUseCase } from '../get-report.js'

export function makeGetProjectsReportUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  return new GetProjectsReportUseCase(projectsRepository)
}
