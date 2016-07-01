 

import { Component, OnInit } from '@angular/core'
import { FacebookConnect } from './services/facebook-connect'
import { UserService } from './services/user-service'
import { User } from './services/data'
import { GlobalService } from './services/global-service'
 
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'app-login.component.html',
})
export class AppLoginComponent implements OnInit {

  // the loggedIn user
  user: User

  // constructor
  constructor(private facebookConnect: FacebookConnect,
              private userService: UserService,
              private globalService: GlobalService) { }

  // initialize 
  ngOnInit() { 
    // check facebook connecting status
    this.facebookConnect.initSDK(() => {
      this.facebookConnect.getLoginStatus(this.facebookLoggedIn.bind(this))
    })
  }

  // login status change
  facebookLoggedIn(accessToken: string) {
    this.userService.loginByFacebook(accessToken, (loggedInUser) => {
      this.user = loggedInUser
      this.globalService.currentUser = loggedInUser
    })
  }

  onLoginClicked() {
    this.facebookConnect.login(this.facebookLoggedIn.bind(this))
  }

}