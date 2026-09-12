import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetProjectsReportUseCase } from '@/use-cases/reports/factories/make-get-projects-report.js'

export async function projectsReport(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const getProjectsReportUseCase = makeGetProjectsReportUseCase()
  const { projects } = await getProjectsReportUseCase.execute()
  return reply.status(200).send(projects)
}
