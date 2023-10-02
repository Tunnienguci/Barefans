import { User } from './user';

export interface Post {
  id: number;
  content?: string;
  images?: string[];
  video?: string;
  time: string;
  user: User;
  comments: Comment[];
  likes: Like[];
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
