import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationComponent } from './pages/client/notification/notification.component';
import { PostDetailComponent } from './pages/client/post-detail/post-detail.component';
import { WatchComponent } from './pages/client/watch/watch.component';
import { ProfileComponent } from './pages/client/profile/profile.component';
import { TimelineComponent } from './common/profile/timeline/timeline.component';
import { AboutComponent } from './common/profile/about/about.component';
import { FriendComponent } from './common/profile/friend/friend.component';
import { PhotoComponent } from './common/profile/photo/photo.component';
import { VideoComponent } from './common/profile/video/video.component';
import { AuthGuard } from './helpers/auth.guard';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'watch',
    component: WatchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
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
        path: 'friends',
        component: FriendComponent,
      },
      {
        path: 'photos',
        component: PhotoComponent,
      },
      {
        path: 'videos',
        component: VideoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
