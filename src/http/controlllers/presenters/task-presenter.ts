import type { Task } from '@/@types/prisma/client.js'

type HTTPTask = {
  id: string
  title: string
  description: string | null
  priority: string
  completed: boolean
  deadline: Date | null
  createdAt: Date
  updatedAt: Date
}

export class TaskPresenter {
  static toHTTP(task: Task): HTTPTask
  static toHTTP(tasks: Task[]): HTTPTask[]
  static toHTTP(input: Task | Task[]): HTTPTask | HTTPTask[] {
    if (Array.isArray(input)) {
      return input.map((task) => this.toHTTP(task))
    }

    return {
      id: input.publicId,
      title: input.title,
      description: input.description,
      priority: input.priority,
      completed: input.completed,
      deadline: input.deadline,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
