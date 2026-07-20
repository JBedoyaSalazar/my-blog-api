import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, ValidateNested } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'password123!A',
    description: 'The password of the user',
    minLength: 8,
    maxLength: 255,
  })
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

  @ApiProperty({
    example: '[EMAIL_ADDRESS]',
    description: 'The email of the user',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: {
      name: 'John',
      lastName: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
    description: 'The profile of the user',
  })
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile!: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  @ApiProperty({
    example: {
      name: 'John',
      lastName: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
    description: 'The profile of the user',
  })
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile!: UpdateProfileDto;
}
