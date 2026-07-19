import { Controller, Req, UseGuards, Post } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  //   constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('localStrategy'))
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
    // return this.authService.validateUser(req.user.email, req.user.password);
  }
}
