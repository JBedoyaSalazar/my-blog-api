import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Payload } from '../../auth/models/payload.model';
import { Post as PostEntity } from '../entities/post.entity';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload
    const userId = payload.sub
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({status: 200, description: 'Returns all posts', type: [PostEntity]})
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({status: 200, description: 'Returns a post by id', type: PostEntity})
  @ApiResponse({status: 404, description: 'Post not found'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by id' })
  @ApiResponse({status: 200, description: 'Returns the updated post', type: PostEntity})
  @ApiResponse({status: 404, description: 'Post not found'})
  @ApiResponse({status: 403, description: 'Forbidden - Not authorized to update this post'})
  update(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdatePostDto, @Req() req: Request) {
    const payload = req.user as Payload
    const userId = payload.sub
    return this.postsService.update(id, changes, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish a post by id' })
  @ApiResponse({status: 200, description: 'Returns the updated post'})
  @ApiResponse({status: 404, description: 'Post not found'})
  @ApiResponse({status: 403, description: 'Forbidden - Not authorized to publish this post'})
  publish(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as Payload
    const userId = payload.sub
    return this.postsService.publish(id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiResponse({status: 200, description: 'Returns the deleted post'})
  @ApiResponse({status: 404, description: 'Post not found'})
  @ApiResponse({status: 403, description: 'Forbidden - Not authorized to delete this post'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
