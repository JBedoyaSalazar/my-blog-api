import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './DTO/user.dto';
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
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: {
        profile: true,
      },
    });
    return users;
  }

  async getProfileByUserId(id: number): Promise<User> {
    const user = await this.userById(id);
    return user;
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
    try {
      const user = await this.userById(id);

      const updatedUser = this.usersRepository.merge(user, changes);
      const savedUser = await this.usersRepository.save(updatedUser);

      return savedUser;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(`Error updating user`);
    }
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    try {
      await this.usersRepository.remove(await this.userById(id));
      return {
        message: `User with id ${id} deleted successfully`,
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(`Error deleting user`);
    }
  }
}
