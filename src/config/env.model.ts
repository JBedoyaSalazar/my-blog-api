import { SignOptions } from 'jsonwebtoken';

export interface Env {
  APP_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DATABASE_URL?: string;
  NODE_ENV: 'development' | 'production';

  ENCRYPT_SALT: number;

  JWT_SECRET: string;
  JWT_EXPIRES_IN: SignOptions['expiresIn'];

  GEMINI_KEY: string;
}
