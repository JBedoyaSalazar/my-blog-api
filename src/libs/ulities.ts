import { BadRequestException } from '@nestjs/common';

export function validationEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new BadRequestException('The email format is invalid');
  }
}
