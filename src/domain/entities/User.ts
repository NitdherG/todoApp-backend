/**
 * Represents a user with an ID, email, and creation date.
 */
export class User {
  /**
   * Creates an instance of User.
   * @param id - The unique identifier for the user.
   * @param email - The email address of the user.
   * @param createdAt - The date and time when the user was created. Defaults to the current date and time.
   */
  constructor(
    public id: string,
    public email: string,
    public createdAt: Date = new Date(),
  ) {}
}
