import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  myUser: any;

  // Subscription
  private myUserSubscription: Subscription;

  constructor(private loginService: LoginService) {
    this.myUserSubscription = this.loginService.userData$.subscribe(
      (res: any) => {
        if (res) {
          this.myUser = res;
        }
      }
    );
  }

  ngOnInit(): void {
    this.loginService.getUser().subscribe((res) => {
      this.myUser = res;
    });
  }

  ngOnDestroy(): void {
    this.myUserSubscription.unsubscribe();
  }
}
