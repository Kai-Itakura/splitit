import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from 'src/modules/user/domain/interfaces/user.repository.interface';

@Injectable()
export class EventGroupUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async userExists(userId: string): Promise<boolean> {
    const user = await this.userRepository.exists(userId);
    return !!user;
  }
}
