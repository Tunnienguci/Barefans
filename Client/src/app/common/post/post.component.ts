import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  listPosts: any[] = [];

  constructor(private postService: PostService, private router: Router) {
    this.postService.getListPosts().subscribe((res) => {
      this.listPosts = res;
    });
  }

  ngOnInit() {
    this.postService.getListPosts().subscribe((res) => {
      this.listPosts = res;
    });
  }

  ngOnChanges() {
    this.postService.getListPosts().subscribe((res) => {
      this.listPosts = res;
    });
  }

  removePost(id: any) {
    this.postService.removePost(id).subscribe((res) => {
      this.listPosts = res;
    });
  }

  openLink(link: any) {
    this.router.navigate(['/post'], { queryParams: { id: link } });
  }

  likePost(id: any) {
    this.postService.likePost(id).subscribe((res) => {
      this.listPosts = res;
    });
  }

  calculateTime(time: any) {
    const currentTime = new Date().getTime();
    const postTime = new Date(time).getTime();
    const timeAgo = currentTime - postTime;
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    if (timeAgo < minute) {
      return `${Math.floor(timeAgo / 1000)} seconds ago`;
    } else if (timeAgo < hour) {
      const minutes = Math.floor(timeAgo / minute);
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (timeAgo < day) {
      const hours = Math.floor(timeAgo / hour);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (timeAgo < month) {
      const days = Math.floor(timeAgo / day);
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else {
      const months = Math.floor(timeAgo / month);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    }
  }

  copyLink(link: any) {
    navigator.clipboard.writeText('http://localhost:4200/post?id=' + link);
  }

  ngOnDestroy() {
    //Unsubscribe to prevent memory leak
    this.postService.getListPosts().subscribe().unsubscribe();
    this.postService.removePost('').subscribe().unsubscribe();
  }
}
