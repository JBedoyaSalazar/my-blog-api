import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsOptional()
  content!: string;

  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(800)
  coverImage!: string;

  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  @MaxLength(255)
  summary!: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;

  // @IsNumber()
  // @IsNotEmpty()
  // userId!: number;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(5)
  categoryIds?: number[];
}
