import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO, UserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDTO): Promise<UserDTO> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create(dto.email, hashedPassword);
    return plainToInstance(UserDTO, user);
  }
}
