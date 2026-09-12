import type { Project } from '@/@types/prisma/client.js'

type HTTPProject = {
  id: string
  name: string
  description: string | null
  status: string
  createdAt: Date
  updatedAt: Date
}

export class ProjectPresenter {
  static toHTTP(project: Project): HTTPProject
  static toHTTP(projects: Project[]): HTTPProject[]
  static toHTTP(input: Project | Project[]): HTTPProject | HTTPProject[] {
    if (Array.isArray(input)) {
      return input.map((project) => ProjectPresenter.toHTTP(project))
    }

    return {
      id: input.publicId,
      name: input.name,
      description: input.description,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
