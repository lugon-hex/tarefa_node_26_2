export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Já existe um usuário com este email no sistema!')
  }
}
