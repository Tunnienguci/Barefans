import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // DataStore
  curUser: User | any = {};

  // Constructor
  constructor(private http: HttpClient) {}

  // [GET] Get user by username
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}/user?username=${username}`
    );
  }

  // [POST] Update user
  followUser(sendUser: any, receiveUser: any) {
    return this.http.post(
      `${environment.apiUrl}/user/follow?username=${sendUser}`,
      {
        usernameFollow: receiveUser,
      }
    );
  }

  // [GET] Get received follow requests
  getReceivedFollowRequests(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/myreceive?id=${id}`);
  }

  // [POST] Accept follow request
  acceptFollowRequest(sendUser: any, receiveUser: any) {
    return this.http.post(
      `${environment.apiUrl}/user/accept?username=${sendUser}`,
      {
        usernameAccept: receiveUser,
      }
    );
  }

  // [POST] Reject follow request
  recjectFollowRequest(username: any, id: any) {
    return this.http.post(
      `${environment.apiUrl}/user/reject?username=${username}&reqname=${id}`,
      {}
    );
  }

  // [GET] Get friends
  getFriends(username: any): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/user/myfriend?username=${username}`
    );
  }
}
