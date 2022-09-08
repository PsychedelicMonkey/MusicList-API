import { Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  followersCount: number;
  followingCount: number;

  followers: Array<User>;
  following: Array<User>;

  checkPassword(password: string): Promise<boolean>;
}
