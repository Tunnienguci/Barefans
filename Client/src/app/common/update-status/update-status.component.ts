import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent {
  postForm: FormGroup;
  time: string = new Date().toLocaleTimeString();
  imageList: any[] = [];
  videoList: any[] = [];
  searchInput: string = '';
  selectedEmoji: any;

  constructor(
    private postService: PostService,
    private locationService: LocationService
  ) {
    this.postForm = new FormGroup({
      content: new FormControl(''),
      images: new FormControl(''),
      video: new FormControl(''),
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageList.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onVideoChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      let filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.videoList.push(e.target.result);
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    }
  }

  addEmoji(event: any) {
    this.selectedEmoji = event.emoji;
  }

  removeEmoji() {
    this.selectedEmoji = '';
  }

  removeImg(index: any) {
    this.imageList.splice(index, 1);
  }

  searchLocation(e: any) {
    this.locationService.searchLocation(e.target.value).subscribe((res) => {
      this.searchInput = res.predictions[0].description;
    });
  }

  onSubmit() {
    let post = {
      id: Math.floor(Math.random() * 1000000000000000000),
      like: 0,
      comment: [],
      user: {
        name: 'Cong Tuan',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      liked: false,
      content: this.postForm.value.content,
      images: this.imageList,
      video: this.videoList,
      time: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
      location: this.searchInput,
      emoji: this.selectedEmoji,
    };

    if (post.content || post.images.length > 0 || post.video.length > 0) {
      this.postService.addPost(post);
      this.postForm.reset();
      this.searchInput = '';
      this.selectedEmoji = '';
      this.imageList = [];
      this.videoList = [];
    }
  }
}
