import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from './env.model';

export const databaseConfig = (configService: ConfigService<Env>): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST', { infer: true }),
  port: configService.getOrThrow('DB_PORT', { infer: true }),
  username: configService.getOrThrow('DB_USERNAME', { infer: true }),
  password: configService.getOrThrow('DB_PASSWORD', { infer: true }),
  database: configService.getOrThrow('DB_NAME', { infer: true }),

  autoLoadEntities: true,
  synchronize: false,
});
