export class ResourceNotFoundError extends Error {
  constructor() {
    super('Recurso nao encontrado no sistema')
  }
}
