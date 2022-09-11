import express, { NextFunction } from 'express';
import type { Application, Request, Response } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import initializePassport from './config/passport';
import { COOKIE_SECRET, CORS_ORIGIN } from './utils/secrets';

import albumRouter from './routes/album';
import artistRouter from './routes/artist';
import authRouter from './routes/auth';
import listRouter from './routes/list';
import profileRouter from './routes/profile';
import searchRouter from './routes/search';
import logger from './utils/logger';

initializePassport();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(cookieParser(COOKIE_SECRET));
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan('dev'));

app.use('/album', albumRouter);
app.use('/artist', artistRouter);
app.use('/auth', authRouter);
app.use('/list', listRouter);
app.use('/profile', profileRouter);
app.use('/search', searchRouter);

// Catch-all 404 route
app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({ msg: 'not found' });
});

// Default error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'CastError') {
    logger.warn(`invalid ObjectID passed to route: ${req.url}`);
    return res.status(400).json({ msg: 'invalid id' });
  }

  logger.error(new Error(err).stack);
  return res.status(500).json({ msg: 'server error' });
});

export default app;
