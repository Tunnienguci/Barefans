import { Post } from './post';

export interface User {
  id?: number;
  fullName: string;
  birthday?: string;
  avatar?: string;
  bio?: string;
  hometown?: string;
  live?: string;
  relationship?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  secondarySchool?: string;
  highSchool?: string;
  college?: string;
  university?: string;
  work?: {
    company: string;
    position: string;
  };
  posts?: Post[];
  albums?: string[];
  friends?: User[];
  requests?: friendRequest[];
  account?: Account;
}

export interface friendRequest {
  sendRequest?: User[];
  receiveRequest?: User[];
  status?: boolean;
}

export interface Account {
  username?: string;
  password?: string;
  permission?: string;
}
