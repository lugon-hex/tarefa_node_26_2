export class ProjectHasTasksError extends Error {
  constructor() {
    super('O projeto possui tarefas associadas!')
  }
}
