import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Transform(({ value }) => value.trim())
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
