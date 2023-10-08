import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private listPostsSubject = new BehaviorSubject<any[]>([]);
  public listPosts$ = this.listPostsSubject.asObservable();

  private userPostsSubject = new BehaviorSubject<any[]>([]);
  public userPosts$ = this.userPostsSubject.asObservable();

  isLoading: boolean = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.getListPosts().subscribe((res: any) => {
      this.listPostsSubject.next(res.posts);
      this.isLoading = false;
    });
  }

  createPost(data: any): void {
    this.http
      .post(environment.apiUrl + '/post/create', data)
      .subscribe((res: any) => {
        if (res) {
          this.getListPosts().subscribe((res: any) => {
            this.listPostsSubject.next(res.posts);
          });
        }
      });
  }

  getListPosts(): Observable<any> {
    return this.http.get(environment.apiUrl + '/post');
  }

  getPostByUser(id: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/post/userpost?username=${id}`)
      .pipe(
        tap((res: any) => {
          this.userPostsSubject.next(res.posts);
        })
      );
  }

  removePost(id: any, username: string): void {
    this.http.delete(`${environment.apiUrl}/post/delete?id=${id}`).subscribe(
      (res: any) => {
        if (res) {
          this.getListPosts().subscribe((res: any) => {
            this.listPostsSubject.next(res.posts);
          });

          this.getPostByUser(username).subscribe((res: any) => {
            this.userPostsSubject.next(res.posts);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  likePost(id: any, user: any, userName: string): void {
    this.http
      .post(`${environment.apiUrl}/post/like`, {
        id,
        user,
      })
      .subscribe((res: any) => {
        if (res) {
          this.getListPosts().subscribe((res: any) => {
            this.listPostsSubject.next(res.posts);
          });

          this.getPostByUser(userName).subscribe((res: any) => {
            this.userPostsSubject.next(res.posts);
          });
        }
      });
  }

  commentPost(comment: any): void {
    this.http
      .post(`${environment.apiUrl}/post/comment`, comment)
      .subscribe((res: any) => {
        if (res) {
          this.getListPosts().subscribe((res: any) => {
            this.listPostsSubject.next(res.posts);
          });

          this.getPostByUser(comment.user.username).subscribe((res: any) => {
            this.userPostsSubject.next(res.posts);
          });
        }
      });
  }

  removeCommentById(id: any, commentId: any): void {
    this.http
      .post(
        `${environment.apiUrl}/post/removeCommentById?id=${id}&commentId=${commentId}`,
        {}
      )
      .subscribe((res: any) => {
        if (res) {
          this.getListPosts().subscribe((res: any) => {
            this.listPostsSubject.next(res.posts);
          });
        }
      });
  }
}
