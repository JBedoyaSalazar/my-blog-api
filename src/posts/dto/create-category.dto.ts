import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Programming',
    description: 'The name of the category',
    maxLength: 100,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'The name of the category',
    description: 'The description of the category',
    maxLength: 800,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(800)
  description!: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The cover image of the category',
    maxLength: 800,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(800)
  coverImage!: string;
}
