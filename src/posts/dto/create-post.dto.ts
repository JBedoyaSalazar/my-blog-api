import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
    maxLength: 255,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @ApiProperty({
    example: 'My First Post',
    description: 'The content of the post',
  })
  @IsString()
  @IsOptional()
  content!: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The cover image of the post',
    maxLength: 800,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(800)
  coverImage!: string;

  @ApiProperty({
    example: 'My First Post',
    description: 'The summary of the post',
    maxLength: 255,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(255)
  summary!: string;

  @ApiProperty({
    example: false,
    description: 'The draft status of the post',
  })
  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;

  // @IsNumber()
  // @IsNotEmpty()
  // userId!: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'The category IDs of the post',
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(5)
  categoryIds?: number[];
}
