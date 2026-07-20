import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from './env.model';

export const databaseConfig = (
  config: ConfigService<Env>,
): TypeOrmModuleOptions => {
  const nodeEnv = config.getOrThrow('NODE_ENV', { infer: true });

  if (nodeEnv === 'production') {
    return {
      type: 'postgres',

      url: config.getOrThrow('DATABASE_URL', { infer: true}),

      ssl: {
        rejectUnauthorized: false,
      },

      autoLoadEntities: true,
      synchronize: false,
    };
  }

  return {
    type: 'postgres',

    host: config.getOrThrow('DB_HOST', { infer: true }),
    port: config.getOrThrow('DB_PORT', { infer: true }),
    username: config.getOrThrow('DB_USERNAME', { infer: true }),
    password: config.getOrThrow('DB_PASSWORD', { infer: true }),
    database: config.getOrThrow('DB_NAME', { infer: true }),

    autoLoadEntities: true,
    synchronize: false,
  };
};