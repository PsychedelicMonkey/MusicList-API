import express, { Application } from 'express';
import { join } from 'path';

import indexRouter from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));

app.use('/', indexRouter);

export default app;
