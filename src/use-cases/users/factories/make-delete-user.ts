import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteUserUseCase } from '../delete-user.js'

export function makeDeleteUseCase() {
  const userRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  return deleteUserUseCase
}
