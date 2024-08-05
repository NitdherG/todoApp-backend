/**
 * Represents a task with a name, completion status, and creation date.
 */
export class Task {
  /**
   * Creates an instance of Task.
   * @param name - The name of the task.
   * @param completed - The completion status of the task. Defaults to false.
   * @param createdAt - The date and time when the task was created. Defaults to the current date and time.
   */
  constructor(
    public id: string,
    public name: string,
    public completed: boolean = false,
    public createdAt: Date = new Date(),
    public description: string = "",
  ) {}
}
