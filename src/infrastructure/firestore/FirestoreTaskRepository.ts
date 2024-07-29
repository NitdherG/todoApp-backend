import { Task, TaskRepository } from "../../domain";
import { db } from "./FirestoreConfig";

export class FirestoreTaskRepository implements TaskRepository {
  async addTask(task: Task): Promise<void> {
    await db.collection("tasks").add({
      id: task.id,
      name: task.name,
      completed: task.completed,
      createdAt: task.createdAt,
    });
  }
  async getTasks(): Promise<Task[]> {
    const snapshot = await db.collection("tasks").get();
    return snapshot.docs.map(
      (doc) =>
        new Task(
          doc.id,
          doc.data().name,
          doc.data().completed,
          doc.data().createdAt.toDate(),
        ),
    );
  }
  async deleteTask(id: string): Promise<void> {
    await db.collection("tasks").doc(id).delete();
  }
}
