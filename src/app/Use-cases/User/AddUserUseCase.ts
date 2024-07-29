import { User, UserRepository } from "../../../domain";

export class AddUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<void | null> {
    await this.userRepository.addUser(user);
  }
}
