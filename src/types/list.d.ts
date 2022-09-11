import type { Album } from 'music';
import type { User } from 'user';

export type List = {
  name: string;
  description?: string;
  user: User;
  albums: Array<Album>;
};
