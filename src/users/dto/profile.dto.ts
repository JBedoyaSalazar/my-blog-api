import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    example: 'John',
    description: 'The name of the profile',
    maxLength: 255,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the profile',
    maxLength: 255,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName!: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'The avatar of the profile',
    maxLength: 300,
    minLength: 1,
  })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @IsUrl()
  @IsOptional()
  avatar!: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
