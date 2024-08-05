import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../../app/Use-cases/Task/DeleteTaskUseCase";
import { GetUserUseCase } from "../../app/Use-cases/User/GetUserUseCase";
import { CustomError } from "../../domain/errors/custom.error";
import {
  FirestoreTaskRepository,
  FirestoreUserRepository,
} from "../../infrastructure/firestore";

const taskRepository = new FirestoreTaskRepository();
const userRepository = new FirestoreUserRepository();
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const getUserUseCase = new GetUserUseCase(userRepository);

/**
 * TaskController handles HTTP requests related to users.
 */
export class TaskController {
  /**
   * Handles errors by sending the appropriate HTTP response.
   * @param error - The error that occurred.
   * @param res - The HTTP response object.
   * @remarks
   * If the error is an instance of `CustomError`, the status code and message from the error are used in the response.
   * For other errors, a generic 500 Internal Server Error response is sent.
   * The error is logged to the console for debugging; consider using a logging library like Winston for production environments.
   */
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  /**
   * Deletes a task for a specific user.
   * @param req - The HTTP request object containing the email and task ID as parameters.
   * @param res - The HTTP response object.
   * @returns A response indicating the result of the delete operation.
   * @remarks
   * This method retrieves the user using the provided email and then deletes the specified task.
   * If the user exists and the task is successfully deleted, a success message is sent.
   * If an error occurs, it is handled by the `handleError` method.
   */
  async deleteTask(req: Request, res: Response) {
    try {
      const { email, id } = req.params;

      // Retrieve the user using the provided email
      const user = await getUserUseCase.execute(email);

      if (user) {
        // Delete the specified task
        await deleteTaskUseCase.execute(user.id, id);
        res.status(200).json({ message: "Tarea eliminada exitosamente" });
      }

      res.status(404).json({ error: "Usuario no encontrado" });
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
