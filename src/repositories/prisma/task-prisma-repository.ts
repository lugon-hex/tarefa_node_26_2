import type { Prisma } from '@/@types/prisma/client.js'
import type { ListTaskQuery, TasksRepository } from '../tasks-repository.js'
import { prisma } from '@/libs/prisma.js'
import { TaskUserNotFoundError } from '@/use-cases/errors/task-user-not-found-error.js'

export class PrismaTaskRepository implements TasksRepository {
  async create(data: Prisma.TaskCreateInput) {
    return await prisma.task.create({ data })
  }

  async findBy(where: Prisma.TaskWhereInput) {
    return await prisma.task.findFirst({ where })
  }

  async list(filters: ListTaskQuery = {}) {
    const { completed, priority, sort, order } = filters

    return await prisma.task.findMany({
      where: {
        completed,
        priority,
      },
      orderBy: sort ? { [sort]: order ?? 'asc' } : undefined,

      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async delete(id: number) {
    await prisma.task.delete({
      where: { id },
    })
  }

  async update(id: number, data: Prisma.TaskUpdateInput) {
    return await prisma.task.update({
      where: { id },
      data,
    })
  }

  async countByProjectId(projectId: number) {
    return await prisma.task.count({
      where: {
        projectId,
      },
    })
  }

  async findManyByProjectId(projectId: number) {
    return prisma.task.findMany({
      where: {
        projectId,
      },
    })
  }

  async findManyByUserId(userId: number) {
    return prisma.task.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    })
  }

  async assignUsers(taskId: number, userIds: number[]) {
    await prisma.taskUser.createMany({
      data: userIds.map((userId) => ({
        taskId,
        userId,
      })),
      skipDuplicates: true,
    })

    return prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async removeUser(taskId: number, userId: number): Promise<void> {
    const taskUser = await prisma.taskUser.findFirst({
      where: {
        taskId,
        userId,
      },
    })
    if (!taskUser) {
      throw new TaskUserNotFoundError()
    }
    await prisma.taskUser.delete({
      where: {
        id: taskUser.id,
      },
    })
  }
}
