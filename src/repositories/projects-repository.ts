import type { Prisma, Project, Task } from '@/@types/prisma/client.js'

export interface ProjectsRepository {
  create(data: Prisma.ProjectCreateInput): Promise<Project>
  findBy(where: Prisma.ProjectWhereInput): Promise<Project | null>
  list(): Promise<Project[]>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.ProjectUpdateInput): Promise<Project>
  findManyWithTasks(): Promise<(Project & { tasks: Task[] })[]>
}
