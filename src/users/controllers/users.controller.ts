import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { Post as PostEntity } from '../../posts/entities/post.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({status: 200, description: 'Returns all users', type: [User]})
  getAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({status: 200, description: 'Returns a user by id', type: User})
  @ApiResponse({status: 404, description: 'User not found'})
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneUser(id);
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Get a user profile by id' })
  @ApiResponse({status: 200, description: 'Returns a user profile by id', type: Profile})
  @ApiResponse({status: 404, description: 'User not found'})
  getProfileByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfileByUserId(id);
  }

  @Get(':id/posts')
  @ApiOperation({ summary: 'Get a user posts by id' })
  @ApiResponse({status: 200, description: 'Returns a user posts by id', type: PostEntity})
  @ApiResponse({status: 404, description: 'User not found'})
  getPostsByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getPostsByUserId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateUserDto) {
    return this.usersService.updateUser(id, changes);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
