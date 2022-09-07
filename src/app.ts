import express, { Application } from 'express';
import { join } from 'path';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));

export default app;
