import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUserUseCase } from '@/use-cases/users/factories/make-authenticate-user.js'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { UserPresenter } from '@/http/controlllers/presenters/user-presenter.js'

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateSchema.parse(request.body)

    const authenticateUserUseCase = makeAuthenticateUserUseCase()
    const { user } = await authenticateUserUseCase.execute( { email, password } )

    const token = await reply.jwtSign(
      { sub: user.publicId, role: user.role },
      { expiresIn: '1d' },
    )

    return reply.status(200).send({
      token,
      user: UserPresenter.toHTTP(user),
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}