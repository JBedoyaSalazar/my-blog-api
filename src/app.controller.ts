import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { Env } from './env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    const appName = this.configService.get('APP_NAME', { infer: true });
    const message = this.appService.getHello();
    return `<h1>${message} - ${appName}</h1>`;
  }

  @Get('tests')
  getTests() {
    return this.usersService.findAllUsers();
  }
}
