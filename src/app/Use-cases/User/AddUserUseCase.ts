
import { User, UserRepository } from "../../../domain";

/**
 * Use case for adding a new user.
 * This class handles the business logic for adding a user to the repository.
 */
export class AddUserUseCase {
  /**
   * Creates an instance of the AddUserUseCase.
   * @param userRepository - The repository to interact with user data.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * Executes the use case to add a new user.
   * @param user - The user object to be added to the repository.
   * @returns A promise that resolves when the user has been added.
   * @throws {Error} - Throws an error if the operation fails.
   * @remarks
   * This method calls the `addUser` method of the `UserRepository` to persist the user data.
   * No value is returned upon successful completion.
   */
  async execute(user: User): Promise<void | null> {
    await this.userRepository.addUser(user);
  }
}

