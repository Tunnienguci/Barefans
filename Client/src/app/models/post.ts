import { User } from './user';

export interface Post {
  _id: string;
  user: User;
  content: string;
  images: string[];
  video: string[];
  emoji: string;
  like: any[];
  comment: any[];
  time: string;
}
