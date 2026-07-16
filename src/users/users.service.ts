import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async userById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.userById(id);

    if (user.id === 1) {
      throw new ForbiddenException(`User with id ${id} is forbidden to be accessed`);
    }

    return user;
  }

  async createUser(body: CreateUserDto): Promise<User> {
    try {
      const newUser: User = await this.usersRepository.save(body);
      return newUser;
    } catch {
      throw new ForbiddenException(`Error creating user`);
    }
  }

  async updateUser(id: number, changes: UpdateUserDto): Promise<User> {
    const user = await this.userById(id);

    const updatedUser = this.usersRepository.merge(user, changes);
    return await this.usersRepository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userById(id);

    await this.usersRepository.remove(user);
    return {
      message: `User with id ${id} deleted successfully`,
    };
  }
}
