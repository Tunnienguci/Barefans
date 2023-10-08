import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  public currentUser$: Observable<any | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/user?username=${username}`)
      .pipe(
        tap((user: User) => {
          this.currentUserSubject.next(user);
        })
      );
  }

  followUser(sendUser: any, receiveUser: any) {
    return this.http
      .post(`${environment.apiUrl}/user/follow?username=${sendUser}`, {
        usernameFollow: receiveUser,
      })
      .subscribe((res: any) => {
        if (res) {
          this.getUserByUsername(receiveUser).subscribe();
        }
      });
  }

  getReceivedFollowRequests(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/myreceive?id=${id}`);
  }

  acceptFollowRequest(sendUser: any, receiveUser: any) {
    return this.http.post(
      `${environment.apiUrl}/user/accept?username=${sendUser}`,
      {
        usernameAccept: receiveUser,
      }
    );
  }

  recjectFollowRequest(username: any, id: any) {
    return this.http.post(
      `${environment.apiUrl}/user/reject?username=${username}&reqname=${id}`,
      {}
    );
  }

  getFriends(username: any): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/user/myfriend?username=${username}`
    );
  }
}
