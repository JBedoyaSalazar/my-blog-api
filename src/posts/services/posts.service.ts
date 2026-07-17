import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  private async postById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        user: {
          profile: true,
        },
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
      const updatedPost = this.postsRepository.merge(post, changes);
      const savedPost = await this.postsRepository.save(updatedPost);
      return savedPost;
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
}
