import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  listPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  // [POST] Create post
  createPost(data: any) {
    return this.http.post(environment.apiUrl + '/post/create', data);
  }

  // [GET] Get list posts
  getListPosts(): Observable<any> {
    return this.http.get(environment.apiUrl + '/post');
  }

  // [GET] Get post by id
  getPostByUser(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/post/userpost?username=${id}`);
  }

  // [DELETE] Delete post
  removePost(id: any) {
    return this.http.delete(`${environment.apiUrl}/post/delete?id=${id}`);
  }

  // [POST] Like post
  likePost(id: any, user: any) {
    return this.http.post(`${environment.apiUrl}/post/like`, {
      id,
      user,
    });
  }

  // [POST] Comment post
  commentPost(comment: any) {
    return this.http.post(`${environment.apiUrl}/post/comment`, comment);
  }

  // [POST] Remove comment by id
  removeCommentById(id: any, commentId: any) {
    return this.http.put(
      `${environment.apiUrl}/post/comment/delete?id=${id}&commentId=${commentId}`,
      {}
    );
  }

  // [GET] Get latest posts
  getLatestPosts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/post/latest`);
  }

  // [GET] Get post by id
  getPostById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/post/postDetail?id=${id}`);
  }
}
