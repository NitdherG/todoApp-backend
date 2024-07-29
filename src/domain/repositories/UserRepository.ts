import { User } from "../entities/User";

export interface UserRepository {
  addUser(user: User): Promise<void>;
  getUser(id: string): Promise<User | null>;
}
