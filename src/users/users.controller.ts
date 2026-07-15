import { Body, Controller, Delete, Get, Param, Patch, Post, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
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

  @Get()
  getAllUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: number): User {
    const user = this.users.find((user) => user.id === parseInt(id.toString()));
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @Post()
  createUser(@Body() { name, email }: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      name: name,
      email: email,
    };

    this.users.push(newUser);
    return newUser;
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() changes: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === parseInt(id.toString()));
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...changes,
    };

    this.users[userIndex] = updatedUser;
    return this.users[userIndex];
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): { message: string } {
    const userIndex = this.users.findIndex((user) => user.id === parseInt(id.toString()));
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
    return {
      message: `User with id ${id} deleted successfully`,
    };
  }
}
