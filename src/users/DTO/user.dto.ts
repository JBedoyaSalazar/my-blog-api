import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, ValidateNested } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

export class CreateUserDto {
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  password!: string;

  @IsEmail()
  email!: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile!: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile!: UpdateProfileDto;
}
