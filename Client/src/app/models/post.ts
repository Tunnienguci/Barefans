import { User } from './user';

export interface Post {
  id: number;
  like: number;
  comment: any[];
  user: User;
  liked: boolean;
  content: string;
  images: any[];
  video: any[];
  time: string;
  emoji: string;
}

export interface Comment {
  id: number;
  content: string;
  time: string;
  user: User;
}

export interface Like {
  id: number;
  user: User;
}
