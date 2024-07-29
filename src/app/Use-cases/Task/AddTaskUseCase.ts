import { Task, TaskRepository } from "../../../domain";

export class AddTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(name: string): Promise<void> {
    const task = new Task("", name);
    await this.taskRepository.addTask(task);
  }
}
