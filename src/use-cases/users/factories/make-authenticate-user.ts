import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthenticateUserUseCase } from '../authenticate.js'

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUseCase
}