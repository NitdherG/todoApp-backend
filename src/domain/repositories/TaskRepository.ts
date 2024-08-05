import { Task } from "../entities/Task";

/**
 * Defines the contract for a repository that manages tasks.
 */
export interface TaskRepository {
  /**
   * Adds a new task for a specific user.
   * @param task - The task to be added.
   * @param userId - The unique identifier of the user to whom the task belongs.
   * @returns A promise that resolves when the task has been added.
   */
  addTask(task: Task, userId: string): Promise<void>;

  /**
   * Retrieves all tasks for a specific user.
   * @param userId - The unique identifier of the user whose tasks are to be retrieved.
   * @returns A promise that resolves to an array of tasks for the user.
   */
  getTasks(
    userId: string,
    limit: number,
    startAfter?: string,
  ): Promise<{ tasks: Task[]; totalCount: number }>;

  /**
   * Deletes a specific task by its ID.
   * @param id - The unique identifier of the task to be deleted.
   * @returns A promise that resolves when the task has been deleted.
   */
  deleteTask(email: string, id: string): Promise<void>;

  updateTask(task: Task, userId: string): Promise<void>;
}
