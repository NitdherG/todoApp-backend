import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

/**
 * Route to add a new user.
 * @route POST /users
 * @param req - The HTTP request object containing user details in the request body.
 * @param res - The HTTP response object.
 * @returns A response indicating the result of the add operation.
 * @remarks
 * This route invokes the `addUser` method of the `UserController` to create a new user with the provided details.
 * On success, it returns a 201 Created status with a success message.
 */
router.post("/users", (req, res) => userController.addUser(req, res));

/**
 * Route to retrieve a user by their email.
 * @route GET /users/:email
 * @param req - The HTTP request object containing the user's email as a route parameter.
 * @param res - The HTTP response object.
 * @returns A response with the user details or an error message.
 * @remarks
 * This route invokes the `getUser` method of the `UserController` to retrieve the user details based on the provided email.
 * If the user is found, it returns a 200 OK status with the user details.
 * If the user is not found, it returns a 500 Internal Server Error with a relevant message.
 */
router.get("/users/:email", (req, res) => userController.getUser(req, res));

/**
 * Route to retrieve all tasks for a specific user.
 * @route GET /users/:email/tasks
 * @param req - The HTTP request object containing the user's email as a route parameter, and optional query parameters for pagination.
 * @param res - The HTTP response object.
 * @returns A response with the user's tasks or an error message.
 * @remarks
 * This route invokes the `getUserTasks` method of the `UserController` to retrieve tasks associated with the user identified by the provided email.
 * Supports pagination via query parameters.
 * If the user is found, it returns a 200 OK status with the tasks.
 * If the user is not found, it returns a 404 Not Found status with a relevant message.
 */
router.get("/users/:email/tasks", (req, res) =>
  userController.getUserTasks(req, res),
);

/**
 * Route to add a new task for a specific user.
 * @route POST /users/:email/tasks
 * @param req - The HTTP request object containing the user's email as a route parameter and task details in the request body.
 * @param res - The HTTP response object.
 * @returns A response indicating the result of the add operation.
 * @remarks
 * This route invokes the `addUserTask` method of the `UserController` to create a new task for the user identified by the provided email.
 * On success, it returns a 201 Created status with a success message.
 * If the user is not found, it returns a 404 Not Found status with a relevant message.
 */
router.post("/users/:email/tasks", (req, res) =>
  userController.addUserTask(req, res),
);

/**
 * Route to update a task for a specific user.
 * @route PUT /users/:email/tasks
 * @param req - The HTTP request object containing the user's email as a route parameter and updated task details in the request body.
 * @param res - The HTTP response object.
 * @returns A response indicating the result of the update operation.
 * @remarks
 * This route invokes the `updateUserTask` method of the `UserController` to update an existing task for the user identified by the provided email.
 * On success, it returns a 200 OK status with a success message.
 * If the user is not found, it returns a 404 Not Found status with a relevant message.
 */
router.put("/users/:email/tasks", (req, res) =>
  userController.updateUserTask(req, res),
);
export default router;
