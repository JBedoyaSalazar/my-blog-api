import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { UsersService } from '../../users/services/users.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,

    @InjectRepository(Category)
    private readonly CategoriesRepository: Repository<Category>,
  ) {}

  private async postById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        user: {
          profile: true,
        },
        categories: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async create(body: CreatePostDto): Promise<Post> {
    try {
      const newPost = await this.postsRepository.save({
        ...body,
        user: { id: body.userId },
        categories: body.categoryIds?.map((id) => ({ id })) || [],
      });
      return await this.postById(newPost.id);
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Error creating post');
    }
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      relations: {
        user: {
          profile: true,
        },
        categories: true,
      },
    });
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postById(id);
    return post;
  }

  async update(id: number, changes: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.postById(id);

      if (changes.userId) {
        post.user = await this.usersService.findOneUser(changes.userId);
      }

      if (changes.categoryIds) {
        post.categories = await this.CategoriesRepository.find({
          where: {
            id: In(changes.categoryIds),
          },
        });
      }

      this.postsRepository.merge(post, {
        title: changes.title,
        content: changes.content,
        summary: changes.summary,
        coverImage: changes.coverImage,
        isDraft: changes.isDraft,
      });

      return this.postsRepository.save(post);
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Error updating post');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.postsRepository.remove(await this.postById(id));
      return {
        message: `Post with id ${id} deleted successfully`,
      };
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Error deleting post');
    }
  }

  async findPostsByCategory(categoryId: number): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      where: { categories: { id: categoryId } },
      relations: {
        user: {
          profile: true,
        },
      },
    });
    return posts;
  }
}
