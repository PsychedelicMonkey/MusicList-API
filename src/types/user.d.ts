import { Document } from 'mongoose';
import { Album, Artist } from 'music';

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
  albums: Array<Album>;
  artists: Array<Artist>;

  checkPassword(password: string): Promise<boolean>;
}
