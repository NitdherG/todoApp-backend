import { AddTaskUseCase } from "../../app/Use-cases/Task/AddTaskUseCase";
import { DeleteTaskUseCase } from "../../app/Use-cases/Task/DeleteTaskUseCase";
import { GetTasksUseCase } from "../../app/Use-cases/Task/GetTaskUseCase";
import { FirestoreTaskRepository } from "../../infrastructure/firestore";

const taskRepository = new FirestoreTaskRepository();
const addTaskUseCase = new AddTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

export class TaskController {
  async addTask(req: any, res: any) {
    try {
      const name = req.body.name;
      await addTaskUseCase.execute(name);
      res.status(200).send("Task added successfully");
    } catch (error) {
      res.status(500).send("Error adding task");
    }
  }

  async getTasks(req: any, res: any) {
    try {
      const tasks = await getTasksUseCase.execute();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).send("Error retrieving tasks");
    }
  }

  async deleteTask(req: any, res: any) {
    try {
      console.log("this. req", req.params);
      const { id } = req.params;
      await deleteTaskUseCase.execute(id);
      res.status(200).send("Task deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting task");
    }
  }
}
