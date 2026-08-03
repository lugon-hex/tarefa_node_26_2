import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UpdateUserUseCase } from '../update-user.js'

export function makeUpdateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)

  return updateUserUseCase
}
