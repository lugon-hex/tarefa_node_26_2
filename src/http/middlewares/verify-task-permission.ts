import type { FastifyReply, FastifyRequest } from 'fastify'
import type { USER_ROLE } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'

export async function verifyTaskPermission(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role, sub } = request.user as {
    role: USER_ROLE
    sub: string
  }

  if (role === 'ADMIN') {
    return
  }

  const { id } = request.params as { id: string }

  const user = await prisma.user.findUnique({
    where: {
      publicId: sub,
    },
  })

  if (!user) {
    return reply.status(401).send()
  }

  const assignment = await prisma.taskUser.findFirst({
    where: {
      userId: user.id,
      task: {
        publicId: id,
      },
    },
  })

  if (!assignment) {
    return reply.status(403).send({
      message: 'Você não tem permissão para realizar esta ação.',
    })
  }
}
