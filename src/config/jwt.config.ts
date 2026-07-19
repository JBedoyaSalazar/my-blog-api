import { ConfigService } from '@nestjs/config';
import { Env } from './env.model';

export const jwtConfig = (config: ConfigService<Env>) => ({
  secret: config.getOrThrow('JWT_SECRET', { infer: true }),
  signOptions: {
    expiresIn: config.getOrThrow('JWT_EXPIRES_IN', { infer: true }),
  },
});
