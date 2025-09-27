import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '../../domain/interfaces/user.repository.interface';
import { ReturnUserDTO } from '../../presentation/dto/return-user.dto';

@Injectable()
export class FindByIdUserCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('User not found!');

    return { id: user.id, email: user.email, name: user.name };
  }
}
