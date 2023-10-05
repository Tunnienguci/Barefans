import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import posts from '../data/post.json';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  listPosts: any[] = [...posts];

  constructor() {}

  addPost(post: any) {
    this.listPosts.unshift(post);
  }

  getListPosts(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.listPosts);
    });
  }

  getPostByUser(id: any): Observable<any> {
    return new Observable((observer) => {
      const filteredPosts = this.listPosts.filter(
        (post) => post.user.account.username === id
      );
      observer.next(filteredPosts);
      observer.complete();
    });
  }

  removePost(id: any): Observable<any> {
    return new Observable((observer) => {
      this.listPosts = this.listPosts.filter((post) => post.id !== id);
      observer.next(this.listPosts);
    });
  }

  likePost(id: any): Observable<any> {
    return new Observable(() => {
      this.listPosts = this.listPosts.map((post) => {
        if (post.id === id) {
          post.liked = !post.liked;
          post.like = post.liked ? post.like + 1 : post.like - 1;
        }
        return post;
      });
    });
  }

  getPostById(id: any): Observable<any> {
    return new Observable((observer) => {
      const filteredPosts = this.listPosts.filter((post) => post.id === id);
      observer.next(filteredPosts);
      observer.complete();
    });
  }

  getListComments(id: any): Observable<any> {
    return new Observable((observer) => {
      const filteredPosts = this.listPosts.filter((post) => post.id === id);
      observer.next(filteredPosts[0].comment);
      observer.complete();
    });
  }

  addComment(id: any, comment: any): Observable<any> {
    return new Observable((observer) => {
      this.listPosts = this.listPosts.map((post) => {
        if (post.id === id) {
          post.comment.push(comment);
        }
        return post;
      });
      observer.next(this.listPosts);
    });
  }

  removeComment(postId: any, commentId: any): Observable<any> {
    return new Observable((observer) => {
      this.listPosts = this.listPosts.map((post) => {
        if (post.id === postId) {
          post.comment = post.comment.filter(
            (comment: any) => comment.id !== commentId
          );
        }
        return post;
      });
      observer.next(this.listPosts);
    });
  }
}
