import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  IUserRepository,
  UserRepositoryToken,
} from '../../domain/repositories/user.repository.interface';
import { FindUserDTO } from '../../presentation/dto/get-user-dto';
import { ReturnUserDTO } from '../../presentation/dto/return-user.dto';

@Injectable()
export class FindByEmailUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: FindUserDTO): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new ForbiddenException('User not found!');
    return plainToInstance(ReturnUserDTO, user);
  }
}
