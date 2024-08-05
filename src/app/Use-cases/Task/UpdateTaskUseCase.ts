
import { Task, TaskRepository } from "../../../domain";

/**
 * Use case for updating a task.
 * This class handles the business logic for updating a task in the repository.
 */
export class UpdateTaskUseCase {
  /**
   * Creates an instance of the UpdateTaskUseCase.
   * @param taskRepository - The repository to interact with task data.
   */
  constructor(private taskRepository: TaskRepository) {}

  /**
   * Executes the use case to update a task.
   * @param task - The task object containing updated data.
   * @param email - The email of the user associated with the task.
   * @returns A promise that resolves when the update operation is complete.
   * @throws {Error} - Throws an error if the update operation fails.
   * @remarks
   * This method calls the `updateTask` method of the `TaskRepository` to update the task data.
   * The method does not return any value; it only indicates the completion of the operation.
   */
  async execute(task: Task, email: string): Promise<void> {
    await this.taskRepository.updateTask(task, email);
  }
}

