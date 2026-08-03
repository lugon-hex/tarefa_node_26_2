import type { ProjectsRepository } from '@/repositories/projects-repository.js'

interface ProjectReport {
  projectId: number
  name: string
  totalTasks: number
  completedTasks: number
  completionPercentage: number
}

type GetProjectsReportUseCaseResponse = {
  projects: ProjectReport[]
}

export class GetProjectsReportUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}
  async execute(): Promise<GetProjectsReportUseCaseResponse> {
    const projects = await this.projectsRepository.findManyWithTasks()

    const report = projects.map((project) => {
      const totalTasks = project.tasks.length

      const completedTasks = project.tasks.filter(
        (task) => task.completed,
      ).length

      const completionPercentage =
        totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

      return {
        projectId: project.id,
        name: project.name,
        totalTasks,
        completedTasks,
        completionPercentage,
      }
    })

    return {
      projects: report,
    }
  }
}
