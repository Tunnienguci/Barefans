import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = {
    id: 340211440328772350,
    fullName: 'Cong Tuan',
    birthday: '12/07/2001',
    avatar:
      'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/375977329_3593526804227457_1894341850510545590_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=Qmt18iCMMrwAX_a3jo9&_nc_ht=scontent.fhan14-3.fna&oh=00_AfBcSCvvNu9B8m5I5zi89-8cLKE4FytbVKxZXTvaU61g9g&oe=6520D370',
    bio: 'I am Cong Tuan',
    hometown: 'Hai Phong',
    live: 'Ha Noi',
    relationship: 'Single',
    facebook: 'FSTunnie',
    twitter: '',
    instagram: 'tunnienguci',
    linkedin: 'qcongtuan',
    secondarySchool: 'Tran Phu',
    highSchool: 'Tran Phu',
    college: 'FPT',
    university: 'FPT',
    work: {
      company: 'FPT',
      position: 'Student',
    },
    posts: [],
    albums: [],
    friends: [],
    requests: [],
    account: {
      username: 'tuanqc',
      password: 'tuanqc',
      permission: 'user',
    },
  };

  constructor() {}

  getUser(): Observable<User> {
    return new Observable((observer) => {
      observer.next(this.user);
      observer.complete();
    });
  }

  updateUser(user: User): Observable<User> {
    return new Observable((observer) => {
      this.user = user;
      observer.next(this.user);
      observer.complete();
    });
  }
}
