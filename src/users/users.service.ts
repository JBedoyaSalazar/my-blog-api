import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
    },
  ];

  private userIndex(id: number): number {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userIndex;
  }

  findAllUsers(): User[] {
    return this.users;
  }

  findOneUser(id: number): User {
    const userIndex = this.userIndex(id);
    return this.users[userIndex];
  }

  createUser({ name, email }: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      name: name,
      email: email,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, changes: UpdateUserDto): User {
    const userIndex = this.userIndex(id);

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...changes,
    };

    return this.users[userIndex];
  }

  deleteUser(id: number): { message: string } {
    const userIndex = this.userIndex(id);

    this.users.splice(userIndex, 1);
    return {
      message: `User with id ${id} deleted successfully`,
    };
  }
}
