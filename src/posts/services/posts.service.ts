import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { UsersService } from '../../users/services/users.service';
import { AiService } from '../../ai/services/ai.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
    @InjectRepository(Category)
    private readonly CategoriesRepository: Repository<Category>,
    private readonly aiService: AiService,
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

  async create(body: CreatePostDto, userId: number): Promise<Post> {
    try {
      const newPost = await this.postsRepository.save({
        ...body,
        user: { id: userId },
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

  async update(id: number, changes: UpdatePostDto, userId: number): Promise<Post> {
    try {
      const post = await this.postById(id);

      if (userId !== post.user.id) {
        throw new ForbiddenException('You are not the owner of this post');
      }

      if (userId) {
        post.user = await this.usersService.findOneUser(userId);
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

  async publish(id: number, userId: number) {
    try {
      const post = await this.postById(id);

      if (userId !== post.user.id) {
        throw new ForbiddenException('You are not the owner of this post');
      }

      if (!post.content || !post.title || post.categories.length <= 0) {
        throw new BadRequestException('Post must have content, title and at least one category to be published');
      }

      const summary = await this.aiService.generateSummary(post.content);
      if (!summary) {
        throw new BadRequestException('Error generating summary');
      }

      const image = await this.aiService.generateImageUrl(summary);
      if (!image) {
        throw new BadRequestException('Error generating image');
      }

      const publishedPost = await this.postsRepository.merge(post, {
        isDraft: false,
        summary,
        coverImage: image,
      });

      const updatedPost = await this.postsRepository.save(publishedPost)

      return this.findOne(updatedPost.id);
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Error publishing post');
    }
  }
}
