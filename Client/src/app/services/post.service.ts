import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  post = {
    id: 340211440328772350,
    like: 0,
    comment: [],
    user: {
      name: 'Cong Tuan',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    liked: false,
    content: "I'm Cong Tuan",
    images: [],
    video: [],
    time: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
    location: [],
    emoji: '',
  };

  listPosts: any[] = [this.post];
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
