import { Controller, Req, UseGuards, Post } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('localStrategy'))
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Req() req: Request) {
    const user = req.user as User;
    return {
      message: `Welcome ${user.profile.name}!`,
      user,
      token: this.authService.generateToken(user),
    };
  }
}
