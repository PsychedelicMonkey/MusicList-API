import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
  logger.debug('.env file loaded');
} else {
  logger.error('.env file not found');
}

export const COOKIE_SECRET: string = process.env.COOKIE_SECRET!;
export const CORS_ORIGIN: string = process.env.CORS_ORIGIN!;

if (!COOKIE_SECRET) {
  logger.error('COOKIE_SECRET is not set');
  process.exit(1);
}
