import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}