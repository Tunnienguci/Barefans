import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { PostComponent } from './common/post/post.component';
import { ContactsComponent } from './common/contacts/contacts.component';
import { FriendComponent } from './common/contacts/friend/friend.component';
import { StoriesComponent } from './common/stories/stories.component';
import { StoryComponent } from './common/stories/story/story.component';
import { RecommendComponent } from './common/recommend/recommend.component';
import { UserComponent } from './common/recommend/user/user.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ItemComponent } from './common/sidebar/item/item.component';
import { HomeComponent } from './pages/client/home/home.component';
import { WatchComponent } from './pages/client/watch/watch.component';
import { LoginComponent } from './pages/login/login.component';
import { UpdateStatusComponent } from './common/update-status/update-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './pages/client/notification/notification.component';
import { AlertComponent } from './common/alert/alert.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailComponent } from './pages/client/post-detail/post-detail.component';
import { ListImageComponent } from './common/list-image/list-image.component';
import { ClientComponent } from './pages/client/client.component';
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
import { ReversePipe } from './pipes/reverse.pipe';
import { AboutItemComponent } from './common/profile/timeline/about-item/about-item.component';
import { BioComponent } from './common/profile/timeline/bio/bio.component';
import { FormEditComponent } from './common/profile/timeline/form-edit/form-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    ContactsComponent,
    FriendComponent,
    StoriesComponent,
    StoryComponent,
    RecommendComponent,
    UserComponent,
    SidebarComponent,
    ItemComponent,
    HomeComponent,
    WatchComponent,
    LoginComponent,
    UpdateStatusComponent,
    NotificationComponent,
    AlertComponent,
    PostDetailComponent,
    ListImageComponent,
    ClientComponent,
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
    ReversePipe,
    AboutItemComponent,
    BioComponent,
    FormEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PickerComponent,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
