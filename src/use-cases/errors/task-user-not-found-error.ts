export class TaskUserNotFoundError extends Error {
  constructor() {
    super('Usuário nao esta relacionado a essa tarefa!')
  }
}
