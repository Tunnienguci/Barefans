import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/client/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationComponent } from './pages/client/notification/notification.component';
import { PostDetailComponent } from './pages/client/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'post',
    component: PostDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'watch',
    component: NotificationComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
