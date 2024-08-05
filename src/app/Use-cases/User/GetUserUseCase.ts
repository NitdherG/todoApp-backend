import { User, UserRepository } from "../../../domain";

/**
 * Use case for retrieving a user by their email.
 * This class handles the business logic for fetching a user from the repository.
 */
export class GetUserUseCase {
  /**
   * Creates an instance of the GetUserUseCase.
   * @param userRepository - The repository to interact with user data.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * Executes the use case to retrieve a user by their email.
   * @param email - The email of the user to be retrieved.
   * @returns A promise that resolves to the user object if found, or null if not found.
   * @throws {Error} - Throws an error if the operation fails.
   * @remarks
   * This method calls the `getUser` method of the `UserRepository` to fetch the user data.
   * The return value is a `User` object if the user is found, otherwise, it returns `null`.
   */
  async execute(email: string): Promise<User | null> {
    return await this.userRepository.getUser(email);
  }
}
