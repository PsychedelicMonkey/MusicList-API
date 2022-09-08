import express, { Application } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import initializePassport from './config/passport';
import { COOKIE_SECRET, CORS_ORIGIN } from './utils/secrets';

import albumRouter from './routes/album';
import artistRouter from './routes/artist';
import authRouter from './routes/auth';
import indexRouter from './routes';
import profileRouter from './routes/profile';
import searchRouter from './routes/search';

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

app.use('/', indexRouter);
app.use('/album', albumRouter);
app.use('/artist', artistRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/search', searchRouter);

export default app;
