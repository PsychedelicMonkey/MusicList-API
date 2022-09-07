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
export const JWT_SECRET: string = process.env.JWT_SECRET!;
export const MONGO_URI: string = process.env.MONGO_URI!;

// ===========================================================================
// Required environment variables
// The API will not run if any of the blow are not set in .env file
// ===========================================================================
if (!COOKIE_SECRET) {
  logger.error('COOKIE_SECRET is not set');
  process.exit(1);
}

if (!MONGO_URI) {
  logger.error('MONGO_URI is not set');
  process.exit(1);
}

if (!JWT_SECRET) {
  logger.error('JWT_SECRET is not set');
  process.exit(1);
}
