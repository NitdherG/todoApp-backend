import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/users", (req, res) => userController.addUser(req, res));
router.get("/users/:id", (req, res) => userController.getUser(req, res));

export default router;
