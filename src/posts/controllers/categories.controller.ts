import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PostsService } from '../services/posts.service';
import { AuthGuard } from '@nestjs/passport';
import { Category } from '../entities/category.entity';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({status: 200, description: 'Returns all categories', type: [Category]})
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiResponse({status: 200, description: 'Returns a category by id', type: Category})
  @ApiResponse({status: 404, description: 'Category not found'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get(':id/posts')
  @ApiOperation({ summary: 'Get all posts by category id' })
  @ApiResponse({status: 200, description: 'Returns all posts by category id', type: [PostEntity]})
  @ApiResponse({status: 404, description: 'Category not found'})
  findPostsByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findPostsByCategory(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by id' })
  @ApiResponse({status: 200, description: 'Returns the updated category'})
  @ApiResponse({status: 404, description: 'Category not found'})
  update(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateCategoryDto) {
    return this.categoriesService.update(id, changes);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by id' })
  @ApiResponse({status: 200, description: 'Returns the deleted category'})
  @ApiResponse({status: 404, description: 'Category not found'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
