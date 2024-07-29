import { Request, Response } from "express";
import { AddUserUseCase } from "../../app/Use-cases/User/AddUserUseCase";
import { GetUserUseCase } from "../../app/Use-cases/User/GetUserUseCase";
import { User } from "../../domain";
import { FirestoreUserRepository } from "../../infrastructure/firestore";

const userRepository = new FirestoreUserRepository();
const addUserUseCase = new AddUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);

export class UserController {
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = new User("", name, email);
      await addUserUseCase.execute(user);
      res.status(201).send({ message: "User added successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error adding user" });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await getUserUseCase.execute(id);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error getting user" });
    }
  }
}
