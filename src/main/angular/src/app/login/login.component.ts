import { Component, OnInit, NgZone } from '@angular/core';
import { User } from '../services/data'
import { FacebookConnectService } from '../services/facebook-connect.service'
import { GlobalService } from '../services/global.service'
import { UserService } from '../services/user.service'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

// the loggedIn user
  user: User

  zone: NgZone

  // constructor
  constructor(private facebookConnect: FacebookConnectService,
              private userService: UserService,
              private globalService: GlobalService) { }

  // initialize 
  ngOnInit() { 
    this.zone = new NgZone({ enableLongStackTrace: true })
    // check facebook connecting status
    this.facebookConnect.initSDK(() => {
      this.facebookConnect.getLoginStatus((accessToken) => {
        this.zone.run( () => this.facebookLoggedIn(accessToken))
      })
    })
  }

  // login status change
  facebookLoggedIn(accessToken: string) {
    this.userService.loginByFacebook(accessToken, (loggedInUser) => {
      this.user = loggedInUser
      this.globalService.currentUser = loggedInUser
      this.globalService.channel("login").emit(this.user)
    })
  }

  onLoginClicked() {
    this.facebookConnect.login(this.facebookLoggedIn.bind(this))
  }

}
