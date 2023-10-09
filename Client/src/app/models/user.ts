import { Post } from './post';

export interface User {
  _id: string;
  fullName: string;
  birthday: string;
  avatar: string;
  bio?: string;
  email?: string;
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
    company?: string;
    position?: string;
  };
  posts?: Post[];
  friends?: User[];
  requests?: [
    {
      _id: string;
      sendRequest: User['_id'];
      receiveRequest: User['_id'];
    }
  ];
  account?: {
    username?: string;
    password?: string;
    permission?: string;
    token?: string;
  };
  verify?: boolean;
}
