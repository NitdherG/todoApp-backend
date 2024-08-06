import { Task, TaskRepository } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";
import { admin, db } from "./FirestoreConfig";
import { Timestamp } from "@google-cloud/firestore";

/**
 * FirestoreTaskRepository is an implementation of TaskRepository that uses Firestore as the data store.
 */
export class FirestoreTaskRepository implements TaskRepository {
  /**
   * Adds a task to the specified user's task collection.
   * @param task - The task to be added.
   * @param userId - The ID of the user to whom the task belongs.
   * @throws {CustomError} - If the task cannot be added.
   */
  async addTask(task: Task, userId: string): Promise<void> {
    try {
      await db.collection(`users/${userId}/tasks`).add({
        name: task.name,
        completed: task.completed,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        description: task.description,
      });
    } catch (error) {
      throw CustomError.badRequest("No se pudo agregar la tarea");
    }
  }

  /**
   * Retrieves all tasks for a specified user with pagination.
   * @param userId - The ID of the user whose tasks are to be retrieved.
   * @param limit - The maximum number of tasks to retrieve.
   * @param startAfter - The ID of the last task from the previous page.
   * @returns An object containing an array of tasks and the total count of tasks.
   * @throws {CustomError} - If the tasks cannot be retrieved.
   */
  async getTasks(
    email: string,
    limit: number,
    startAfter?: string,
  ): Promise<{ tasks: Task[]; totalCount: number }> {
    try {
      let query = db
        .collection(`users/${email}/tasks`)
        .orderBy("createdAt", "desc")
        .limit(limit);

      if (startAfter) {
        const lastDoc = await db
          .collection(`users/${email}/tasks`)
          .doc(startAfter)
          .get();
        query = query.startAfter(lastDoc);
      }

      const snapshot = await query.get();
      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data();
        let createdAt: Date | undefined = undefined;

        // Verificar si createdAt es un Timestamp y convertirlo a Date
        if (data.createdAt instanceof Timestamp) {
          createdAt = data.createdAt.toDate();
        }

        // Manejar el caso cuando createdAt no está presente
        if (!createdAt && data.createdAt !== "") {
          console.warn(`Invalid createdAt value for task: ${doc.id}`);
        }

        return new Task(
          doc.id,
          data.name,
          data.completed,
          createdAt,
          data.description,
        );
      });

      // Obtener el total de ítems
      const totalSnapshot = await db.collection(`users/${email}/tasks`).get();
      const totalCount = totalSnapshot.size;

      return { tasks, totalCount };
    } catch (error) {
      throw CustomError.notFound("No se encontró el usuario con email");
    }
  }

  async updateTask(task: Task, email: string): Promise<void> {
    try {
      await db.collection(`users/${email}/tasks`).doc(task.id).update({
        name: task.name,
        completed: task.completed,
        description: task.description,
      });
    } catch (error) {
      throw CustomError.badRequest("No se pudo actualizar la tarea");
    }
  }
  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to be deleted.
   * @throws {CustomError} - If the task cannot be deleted.
   */

  async deleteTask(email: string, id: string): Promise<void> {
    try {
      const docRef = db.collection(`users/${email}/tasks`).doc(id);

      const doc = await docRef.get();

      if (!doc.exists) {
        throw CustomError.badRequest("La tarea no existe");
      }

      await docRef.delete();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw CustomError.badRequest("No se pudo borrar la tarea");
    }
  }
}
