import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { PostComponent } from './common/post/post.component';
import { ContactsComponent } from './common/contacts/contacts.component';
import { RecommendComponent } from './common/recommend/recommend.component';
import { UserComponent } from './common/recommend/user/user.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ItemComponent } from './common/sidebar/item/item.component';
import { HomeComponent } from './pages/client/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UpdateStatusComponent } from './common/update-status/update-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './pages/client/notification/notification.component';
import { AlertComponent } from './common/alert/alert.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { PostDetailComponent } from './pages/client/post-detail/post-detail.component';
import { ListImageComponent } from './common/list-image/list-image.component';
import { CommentComponent } from './common/comment/comment.component';
import { CmtControlComponent } from './common/comment/cmt-control/cmt-control.component';
import { CmtItemComponent } from './common/comment/cmt-item/cmt-item.component';
import { ListTaskComponent } from './common/list-task/list-task.component';
import { TaskComponent } from './common/list-task/task/task.component';
import { ProfileComponent } from './pages/client/profile/profile.component';
import { TimelineComponent } from './common/profile/timeline/timeline.component';
import { AboutComponent } from './common/profile/about/about.component';
import { PhotoComponent } from './common/profile/photo/photo.component';
import { VideoComponent } from './common/profile/video/video.component';
import { AboutItemComponent } from './common/profile/timeline/about-item/about-item.component';
import { BioComponent } from './common/profile/timeline/bio/bio.component';
import { FormEditComponent } from './common/profile/timeline/form-edit/form-edit.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CloudinaryModule } from '@cloudinary/ng';
import { LoadingComponent } from './common/loading/loading.component';
import { ClientComponent } from './pages/client/client.component';
import { FriendComponent } from './common/profile/friend/friend.component';
import { FriendsComponent } from './common/contacts/friend/friend.component';
import { GroupComponent } from './pages/client/group/group.component';
import { DramaComponent } from './pages/client/drama/drama.component';
import { JoinComponent } from './teams/join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    ContactsComponent,
    RecommendComponent,
    UserComponent,
    SidebarComponent,
    ItemComponent,
    HomeComponent,
    LoginComponent,
    UpdateStatusComponent,
    NotificationComponent,
    AlertComponent,
    PostDetailComponent,
    ListImageComponent,
    CommentComponent,
    CmtControlComponent,
    CmtItemComponent,
    ListTaskComponent,
    TaskComponent,
    ProfileComponent,
    TimelineComponent,
    AboutComponent,
    PhotoComponent,
    VideoComponent,
    AboutItemComponent,
    BioComponent,
    FormEditComponent,
    UpdateProfileComponent,
    LoadingComponent,
    ClientComponent,
    FriendComponent,
    FriendsComponent,
    GroupComponent,
    DramaComponent,
    JoinComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PickerComponent,
    HttpClientModule,
    CloudinaryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
