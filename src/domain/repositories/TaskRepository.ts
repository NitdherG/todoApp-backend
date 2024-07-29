import { Task } from "../entities/Task";

export interface TaskRepository {
  addTask(task: Task): Promise<void>;
  getTasks(): Promise<Task[]>;
  deleteTask(id: string): Promise<void>;
}
