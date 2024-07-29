import { TaskRepository } from "../../../domain";

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute() {
    return this.taskRepository.getTasks();
  }
}
