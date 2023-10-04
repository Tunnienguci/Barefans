import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationComponent } from './pages/client/notification/notification.component';
import { PostDetailComponent } from './pages/client/post-detail/post-detail.component';
import { ClientComponent } from './pages/client/client.component';
import { WatchComponent } from './pages/client/watch/watch.component';
import { ProfileComponent } from './pages/client/profile/profile.component';
import { TimelineComponent } from './common/profile/timeline/timeline.component';
import { AboutComponent } from './common/profile/about/about.component';
import { FriendComponent } from './common/profile/friend/friend.component';
import { PhotoComponent } from './common/profile/photo/photo.component';
import { VideoComponent } from './common/profile/video/video.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'post',
        component: PostDetailComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'watch',
        component: WatchComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: TimelineComponent,
          },
          {
            path: 'about',
            component: AboutComponent,
          },
          {
            path: 'friend',
            component: FriendComponent,
          },
          {
            path: 'photo',
            component: PhotoComponent,
          },
          {
            path: 'video',
            component: VideoComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
