import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(parseInt(id));
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.updateUser(parseInt(id), changes);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(parseInt(id));
  }
}
