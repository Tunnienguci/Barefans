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
      avatar:
        'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/375977329_3593526804227457_1894341850510545590_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=Qmt18iCMMrwAX_a3jo9&_nc_ht=scontent.fhan14-3.fna&oh=00_AfBcSCvvNu9B8m5I5zi89-8cLKE4FytbVKxZXTvaU61g9g&oe=6520D370',
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
        (post) => post.user.id === id
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
