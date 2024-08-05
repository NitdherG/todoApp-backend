import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const taskController = new TaskController();

/**
 * Route to delete a specific task for a user.
 * @route DELETE /users/:email/tasks/:id
 * @param req - The HTTP request object containing the user's email and task ID as route parameters.
 * @param res - The HTTP response object.
 * @returns A response indicating the result of the delete operation.
 * @remarks
 * This route invokes the `deleteTask` method of the `TaskController` to delete a task identified by the provided task ID
 * for the user identified by the provided email.
 * If the task is successfully deleted, it returns a 200 OK status with a success message.
 * If the user or task is not found, or if an error occurs, it is handled by the `deleteTask` method of the `TaskController`.
 */
router.delete("/users/:email/tasks/:id", (req, res) =>
  taskController.deleteTask(req, res),
);

export default router;

