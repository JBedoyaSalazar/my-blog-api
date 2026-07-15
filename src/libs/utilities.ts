import { UnprocessableEntityException } from '@nestjs/common';

export function validationEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new UnprocessableEntityException('The email format is invalid');
  }
}
