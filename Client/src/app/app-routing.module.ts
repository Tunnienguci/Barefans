import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationComponent } from './pages/client/notification/notification.component';
import { PostDetailComponent } from './pages/client/post-detail/post-detail.component';
import { WatchComponent } from './pages/client/watch/watch.component';
import { ProfileComponent } from './pages/client/profile/profile.component';
import { AuthGuard } from './helpers/auth.guard';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { ClientComponent } from './pages/client/client.component';

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
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'post/:id',
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
        path: 'profile/:id',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
