import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private listPostsSubject = new BehaviorSubject<any[]>([]);
  public listPosts$ = this.listPostsSubject.asObservable();

  private userPostsSubject = new BehaviorSubject<any[]>([]);
  public userPosts$ = this.userPostsSubject.asObservable();

  isLoading: boolean = true;

  constructor(private http: HttpClient) {
    this.getListPosts().subscribe((res: any) => {
      this.listPostsSubject.next(res.posts);
      this.isLoading = false;
    });
  }

  createPost(data: any): void {
    this.http
      .post('http://localhost:5000/api/post/create', data)
      .subscribe((res: any) => {
        if (res) {
          this.getListPosts().subscribe((res: any) => {
            this.listPostsSubject.next(res.posts);
          });
        }
      });
  }

  getListPosts(): Observable<any> {
    return this.http.get('http://localhost:5000/api/post');
  }

  getPostByUser(id: any): Observable<any> {
    return this.http
      .get(`http://localhost:5000/api/post/userpost?username=${id}`)
      .pipe(
        tap((res: any) => {
          const userPosts = res.posts;
          this.userPostsSubject.next(userPosts);
        })
      );
  }

  removePost(id: any): void {
    this.http
      .delete(`http://localhost:5000/api/post/delete?id=${id}`)
      .subscribe(
        (res: any) => {
          if (res) {
            this.getListPosts().subscribe((res: any) => {
              this.listPostsSubject.next(res.posts);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  likePost(id: any, user: any): void {
    this.http
      .post(`http://localhost:5000/api/post/like?id=${id}&username=${user}`, {})
      .subscribe((res: any) => {
        if (res) {
          this.getListPosts().subscribe((res: any) => {
            this.listPostsSubject.next(res.posts);
          });
        }
      });
  }
}
