import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {
  post: any[] = [];
  myUser: any;

  private myUserSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.myUserSubscription = this.loginService.userData$.subscribe(
      (res: any) => {
        if (res) {
          this.myUser = res;
        }
      }
    );
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.myUserSubscription.unsubscribe();
  }
}
