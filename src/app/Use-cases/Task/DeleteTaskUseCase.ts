import { TaskRepository } from "../../../domain";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    console.log('id', id)
    await this.taskRepository.deleteTask(id);
  }
}
