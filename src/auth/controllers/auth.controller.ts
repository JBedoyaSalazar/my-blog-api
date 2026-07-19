import { Controller, Req, UseGuards, Post } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('localStrategy'))
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user as User;
    return {
      message: `Welcome ${user.profile.name}!`,
      user,
      token: this.authService.generateToken(user),
    };
  }
}
