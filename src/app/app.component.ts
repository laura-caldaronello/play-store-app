import { Component } from '@angular/core';
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent {
  title = 'play-store-app';
  user!: SocialUser;
  loggedIn!: boolean;
  message: string = '';

  constructor(
      private authService: SocialAuthService,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.getBackEnd();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  getBackEnd() {
    this.http.get('http://corsoweb-tomcat-env.eba-pzpjgr3c.eu-north-1.elasticbeanstalk.com/message-servlet', {responseType: 'text'}).subscribe(resp => {
      this.message = resp;
    })
  }
}
