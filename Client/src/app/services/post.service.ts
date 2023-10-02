import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  listPosts: any[] = [];
  constructor() {}

  addPost(post: any) {
    this.listPosts.push(post);
  }

  getListPosts(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.listPosts);
    });
  }

  removePost(id: any): Observable<any> {
    return new Observable((observer) => {
      this.listPosts = this.listPosts.filter((post) => post.id !== id);
      observer.next(this.listPosts);
    });
  }

  likePost(id: any): Observable<any> {
    return new Observable((observer) => {
      this.listPosts = this.listPosts.map((post) => {
        if (post.id === id) {
          post.liked = !post.liked;
          post.like = post.liked ? post.like + 1 : post.like - 1;
        }
        return post;
      });
      observer.next(this.listPosts);
    });
  }

  postDetail(id: any): Observable<any> {
    return new Observable((observer) => {
      const filteredPosts = this.listPosts.filter((post) => post.id === id);
      observer.next(filteredPosts);
      observer.complete();
    });
  }
}
