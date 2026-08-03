export class ProjectAlreadyExistsError extends Error {
  constructor() {
    super('Já existe um projeto com este email no sistema!')
  }
}
