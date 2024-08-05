import { User } from "../entities/User";

/**
 * Defines the contract for a repository that manages users.
 */
export interface UserRepository {
  /**
   * Adds a new user to the repository.
   * @param user - The user to be added.
   * @returns A promise that resolves when the user has been added.
   */
  addUser(user: User): Promise<void>;

  /**
   * Retrieves a user by their email.
   * @param email - The email address of the user to be retrieved.
   * @returns A promise that resolves to the user if found, or null if no user is found with the specified email.
   */
  getUser(email: string): Promise<User | null>;
}
