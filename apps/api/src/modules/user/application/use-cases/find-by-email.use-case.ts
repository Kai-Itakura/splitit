import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '../../domain/repositories/user.repository.interface';
import { ReturnUserDTO } from '../../presentation/dto/return-user.dto';

@Injectable()
export class FindByEmailUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found!');
    return { id: user.id, email: user.email, name: user.name };
  }
}
