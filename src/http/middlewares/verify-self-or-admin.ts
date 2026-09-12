import type { FastifyReply, FastifyRequest } from 'fastify'
import type { USER_ROLE } from '@/@types/prisma/client.js'

export async function verifySelfOrAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role, sub } = request.user as {
    role: USER_ROLE
    sub: string
  }

  const { publicId } = request.params as { publicId: string }

  if (role === 'ADMIN') {
    return
  }

  if (sub !== publicId) {
    return reply.status(403).send({
      message: 'Você não tem permissão para realizar esta ação.',
    })
  }
}
