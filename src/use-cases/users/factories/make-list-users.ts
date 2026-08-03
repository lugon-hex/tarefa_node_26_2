import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ListUserUseCase } from '../list-users.js'

export function makeListUseCase() {
  const userRepository = new PrismaUsersRepository()
  const listUserUseCase = new ListUserUseCase(userRepository)

  return listUserUseCase
}
