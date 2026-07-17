import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  private async categoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async create(body: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.categoriesRepository.create(body);
      return await this.categoriesRepository.save(newCategory);
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Error creating category');
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryById(id);
  }

  async update(id: number, changes: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryById(id);
      const updatedCategory = this.categoriesRepository.merge(category, changes);
      return await this.categoriesRepository.save(updatedCategory);
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Error updating category');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const category = await this.categoryById(id);
      await this.categoriesRepository.remove(category);
      return {
        message: `Category with id ${id} deleted successfully`,
      };
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Error deleting category');
    }
  }
}
