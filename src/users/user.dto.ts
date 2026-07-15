import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
