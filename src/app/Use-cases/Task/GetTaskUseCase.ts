import { TaskRepository } from "../../../domain";

/**
 * Use case for retrieving tasks.
 * This class encapsulates the business logic required to fetch tasks from the repository.
 */
export class GetTasksUseCase {
  /**
   * Creates an instance of the GetTasksUseCase.
   * @param taskRepository - The repository used to interact with task data.
   */
  constructor(private taskRepository: TaskRepository) {}

  /**
   * Executes the use case to retrieve tasks.
   * @param userId - The ID of the user whose tasks are to be fetched.
   * @param limit - The maximum number of tasks to retrieve.
   * @param startAfter - An optional parameter to specify the starting point for pagination.
   * @returns A promise that resolves to the list of tasks.
   * @throws {Error} - Throws an error if the retrieval operation fails.
   * @remarks
   * This method calls the `getTasks` method of the `TaskRepository` to fetch tasks.
   * The `startAfter` parameter is optional and is used for pagination to retrieve tasks after a specified document.
   * The method returns a promise that resolves to the list of tasks fetched.
   */
  async execute(userId: string, limit: number, startAfter?: string) {
    return this.taskRepository.getTasks(userId, limit, startAfter);
  }
}

