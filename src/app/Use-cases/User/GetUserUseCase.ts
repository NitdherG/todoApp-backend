import { User, UserRepository } from "../../../domain";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.getUser(id);
  }
}
