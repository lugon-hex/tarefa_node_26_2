import type { Prisma } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '../projects-repository.js'
import { prisma } from '@/libs/prisma.js'
import type { Project, Task } from '@/@types/prisma/client.js'

export class PrismaProjectsRepository implements ProjectsRepository {
  async create(data: Prisma.ProjectCreateInput) {
    return await prisma.project.create({ data })
  }

  async findBy(where: Prisma.ProjectWhereInput) {
    return await prisma.project.findFirst({ where })
  }

  async list() {
    return await prisma.project.findMany()
  }

  async delete(id: number) {
    await prisma.project.delete({
      where: { id },
    })
  }

  async update(id: number, data: Prisma.ProjectUpdateInput) {
    return await prisma.project.update({
      where: { id },
      data,
    })
  }

  async findManyWithTasks(): Promise<
    (Project & {
      tasks: Task[]
    })[]
  > {
    return await prisma.project.findMany({
      include: {
        tasks: true,
      },
    })
  }
}
