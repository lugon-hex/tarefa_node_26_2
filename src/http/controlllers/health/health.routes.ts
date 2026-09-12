import type { FastifyInstance } from 'fastify'
import { health } from './health.controller.js'

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', health)
}
