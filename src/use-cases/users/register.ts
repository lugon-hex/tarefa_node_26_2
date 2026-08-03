import { env } from '@/env/index.js'
import { hash } from 'bcryptjs'
import { prisma } from '@/libs/prisma.js'
import type { User } from '@/@types/prisma/client.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

interface RegisterUserUseCaseRequest {
  email: string
  name: string
  password: string
}

type RegisterUserUseCaseResponse = {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    name,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    try {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)

      if (userWithSameEmail) {
        throw new UserAlreadyExistsError()
      }

      const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

      const user = await this.usersRepository.create({
        name,
        email,
        passwordHash,
      })

      return { user }
    } catch (error) {
      throw error
    }
  }
}
