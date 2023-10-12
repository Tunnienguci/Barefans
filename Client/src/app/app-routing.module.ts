import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationComponent } from './pages/client/notification/notification.component';
import { PostDetailComponent } from './pages/client/post-detail/post-detail.component';
import { ProfileComponent } from './pages/client/profile/profile.component';
import { AuthGuard } from './helpers/auth.guard';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { ClientComponent } from './pages/client/client.component';
import { GroupComponent } from './pages/client/group/group.component';
import { DramaComponent } from './pages/client/drama/drama.component';

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
        path: 'workplace',
        component: NotificationComponent,
      },
      {
        path: 'group',
        component: GroupComponent,
      },
      {
        path: 'drama',
        component: DramaComponent,
      },
      {
        path: ':id',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
