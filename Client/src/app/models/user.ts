import { Post } from './post';

export interface User {
  id: number;
  fullName: string;
  avatar: string;
  bio: string;
  birthdate: string;
  posts: Post[];
  albums: string[];
  friends: User[];
  requests: friendRequest[];
  account: Account;
}

export interface friendRequest {
  sendRequest: User[];
  receiveRequest: User[];
  status: boolean;
}

export interface Account {
  username: string;
  password: string;
  permission: string;
}
