import { Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;

  checkPassword(password: string): Promise<boolean>;
}
