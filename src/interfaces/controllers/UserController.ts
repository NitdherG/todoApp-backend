import { Request, Response } from "express";
import { AddUserUseCase } from "../../app/Use-cases/User/AddUserUseCase";
import { GetUserUseCase } from "../../app/Use-cases/User/GetUserUseCase";
import { Task, User } from "../../domain";
import {
  FirestoreTaskRepository,
  FirestoreUserRepository,
} from "../../infrastructure/firestore";
import { GetTasksUseCase } from "../../app/Use-cases/Task/GetTaskUseCase";
import { CustomError } from "../../domain/errors/custom.error";
import { UpdateTaskUseCase } from "../../app/Use-cases/Task/UpdateTaskUseCase";
// Repositories
const userRepository = new FirestoreUserRepository();
const taskRepository = new FirestoreTaskRepository();

// Use cases
const addUserUseCase = new AddUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const getTaskUseCase = new GetTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

/**
 * UserController handles HTTP requests related to users.
 */
export class UserController {
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
   * Adds a new user.
   * @param req - The HTTP request object containing the user details in the request body.
   * @param res - The HTTP response object.
   * @returns A response indicating the result of the add operation.
   * @throws {CustomError} - Throws if the user cannot be added.
   * @remarks
   * This method creates a new `User` instance with the provided email and adds it using the `addUserUseCase`.
   * On success, it returns a 201 Created status with a success message.
   * If an error occurs, it is handled by the `handleError` method.
   */
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const user = new User("", email);
      await addUserUseCase.execute(user);
      const newUser = await getUserUseCase.execute(user.email);
      res.status(201).send({user: newUser ,message: "User added successfully" });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /**
   * Adds a new task to a specific user.
   * @param req - The HTTP request object containing the email in the request parameters and task details in the request body.
   * @param res - The HTTP response object.
   * @returns A response indicating the result of the add operation.
   * @throws {CustomError} - Throws if the task cannot be added.
   * @remarks
   * This method retrieves the user using the provided email, then creates a new `Task` instance with the provided details
   * and adds it using `taskRepository.addTask`.
   * On success, it returns a 201 Created status with a success message.
   * If the user does not exist, it returns a 404 Not Found status with a relevant message.
   * Errors are handled by the `handleError` method.
   */
  async addUserTask(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const { name, description, completed } = req.body.task;
      const user = await getUserUseCase.execute(email);
      if (user) {
        const task = new Task("", name, completed, new Date(), description);
        await taskRepository.addTask(task, user.id);
        res.status(201).send({ message: "Tarea agregada exitosamente" });
      } else {
        res.status(404).send({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /**
   * Retrieves a user by their email.
   * @param req - The HTTP request object containing the email in the request parameters.
   * @param res - The HTTP response object.
   * @returns A response with the user details or an error message.
   * @throws {CustomError} - Throws if the user cannot be found.
   * @remarks
   * This method retrieves the user using the provided email.
   * If the user is found, it returns a 200 OK status with the user details.
   * If the user is not found, it returns a 500 Internal Server Error with a relevant message.
   * Errors are handled by the `handleError` method.
   */
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await getUserUseCase.execute(email);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(500).send({ message: "Error al obtener el usuario" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /**
   * Retrieves all tasks for a specific user.
   * @param req - The HTTP request object containing the email in the request parameters and optional query parameters for pagination.
   * @param res - The HTTP response object.
   * @returns A response with the user's tasks or an error message.
   * @throws {CustomError} - Throws if the tasks cannot be retrieved.
   * @remarks
   * This method retrieves the user using the provided email and then retrieves the tasks associated with that user.
   * It supports pagination via `limit` and `startAfter` query parameters.
   * If the user is found, it returns a 200 OK status with the tasks.
   * If the user is not found, it returns a 404 Not Found status with a relevant message.
   * Errors are handled by the `handleError` method.
   */
  async getUserTasks(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const { limit, startAfter } = req.query;
      const user = await getUserUseCase.execute(email);
      if (user) {
        const tasks = await getTaskUseCase.execute(
          user.id,
          parseInt(limit as string),
          startAfter as string,
        );

        res.status(200).send(tasks);
      } else {
        res.status(404).send({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /**
   * Updates a task for a specific user.
   * @param req - The HTTP request object containing the email in the request parameters and updated task details in the request body.
   * @param res - The HTTP response object.
   * @returns A response indicating the result of the update operation.
   * @throws {CustomError} - Throws if the task cannot be updated.
   * @remarks
   * This method retrieves the user using the provided email and then updates the specified task.
   * If the user is found and the task is successfully updated, it returns a 200 OK status with a success message.
   * If the user is not found, it returns a 404 Not Found status with a relevant message.
   * Errors are handled by the `handleError` method.
   */
  async updateUserTask(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const { task } = req.body;

      const user = await getUserUseCase.execute(email);
      if (user) {
        await updateTaskUseCase.execute(task, user.id);
        res.status(200).send({ message: "Tarea actualizada exitosamente" });
      } else {
        res.status(404).send({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
