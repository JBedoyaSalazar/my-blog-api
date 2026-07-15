import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.model';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService<Env>) {}

  getHello(): string {
    const appName = this.configService.get('APP_NAME', { infer: true });
    return `<h1>Hola mundo - ${appName}</h1>`;
  }
}
