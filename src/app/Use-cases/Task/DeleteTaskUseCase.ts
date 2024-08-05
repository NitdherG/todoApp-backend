import { TaskRepository } from "../../../domain";

/**
 * Use case for deleting a task.
 * This class encapsulates the business logic required to delete a task from the repository.
 */
export class DeleteTaskUseCase {
  /**
   * Creates an instance of the DeleteTaskUseCase.
   * @param taskRepository - The repository used to interact with task data.
   */
  constructor(private taskRepository: TaskRepository) {}

  /**
   * Executes the use case to delete a task.
   * @param email - The email of the user who owns the task.
   * @param id - The ID of the task to be deleted.
   * @returns A promise that resolves when the delete operation is complete.
   * @throws {Error} - Throws an error if the delete operation fails.
   * @remarks
   * This method calls the `deleteTask` method of the `TaskRepository` to remove the task.
   * The method does not return any value; it only indicates the completion of the delete operation.
   */
  async execute(email: string, id: string): Promise<void> {
    await this.taskRepository.deleteTask(email, id);
  }
}
