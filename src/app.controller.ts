import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return `<h1>${this.appService.getHello()}</h1>`;
  }

  @Get('tests')
  getTests() {
    return this.usersService.findAllUsers();
  }
}
