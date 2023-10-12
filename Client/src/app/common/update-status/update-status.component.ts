import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
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
  images: any[] = [];
  editable: boolean = true;
  searchInput: string = '';
  selectedEmoji: any;
  ava: string = '../../../assets/images/avatar-profile.png';
  @Input() isAuth: any;
  @Input() permission: boolean = false;
  @Output() newPost: any = new EventEmitter();

  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private cloudinary: CloudinaryService
  ) {
    this.postForm = new FormGroup({
      content: new FormControl(''),
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    if (
      event.target.files &&
      event.target.files.length > 0 &&
      event.target.files.length < 7
    ) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageList.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);

        // Cloudinary
        const data = new FormData();
        data.append('file', event.target.files[i]);
        data.append('upload_preset', 'barefans');
        data.append('cloud_name', 'dklzco9qq');

        this.isLoading = true;

        this.cloudinary.uploadImage(data).subscribe((res) => {
          if (res) {
            this.images.push(res.url);
            this.isLoading = false;
          }
        });
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

        // Cloudinary
        const data = new FormData();
        data.append('file', e.target.files[i]);
        data.append('upload_preset', 'barefans');
        data.append('cloud_name', 'dklzco9qq');

        this.cloudinary.uploadImage(data).subscribe((res) => {
          if (res) {
            this.images.push(res.url);
          }
        });
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

  onSubmit() {
    let post = {
      user: this.isAuth._id,
      liked: false,
      content: this.postForm.value.content ? this.postForm.value.content : '',
      images: this.images ? this.images : [],
      video: this.videoList ? this.videoList : [],
      emoji: this.selectedEmoji ? this.selectedEmoji : '',
    };

    if (post.content || post.images.length > 0 || post.video.length > 0) {
      this.newPost.emit(post);
      this.postForm.reset();
      this.searchInput = '';
      this.selectedEmoji = '';
      this.imageList = [];
      this.videoList = [];
      this.images = [];
    }
  }
}
