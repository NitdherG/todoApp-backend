import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const taskController = new TaskController();

router.post("/tasks", (req, res) => taskController.addTask(req, res));
router.get("/tasks", (req, res) => taskController.getTasks(req, res));
router.delete("/tasks/:id", (req, res) => taskController.deleteTask(req, res));

export default router;
