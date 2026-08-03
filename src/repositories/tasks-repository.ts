import type { Prisma, Task } from '@/@types/prisma/client.js'

export interface ListTaskQuery {
  completed?: boolean
  priority?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export interface TasksRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
  findBy(where: Prisma.TaskWhereInput): Promise<Task | null>
  list(filters?: ListTaskQuery): Promise<Task[]>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.TaskUpdateInput): Promise<Task>
  countByProjectId(projectId: number): Promise<number>
  findManyByProjectId(projectId: number): Promise<Task[]>
  findManyByUserId(userId: number): Promise<Task[]>
  assignUsers(taskId: number, userIds: number[]): Promise<Task>
  removeUser(taskId: number, userId: number): Promise<void>
}
