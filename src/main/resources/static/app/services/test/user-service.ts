import { Http, Headers, RequestOptions } from '@angular/http'
import { Component, OnInit } from '@angular/core'
import { User } from '../data'


/// the user service
@Component({
  providers: [Http]
})
export class UserService {

  /// constructor of the user service
  constructor(private http: Http) {
  }

  /// login by facebook
  loginByFacebook(accessToken: string, onSuccess: Function) {
    /*
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    this.http.post("/user/fbLogin", accessToken, options)
        .subscribe(
          response => {
            var data = response.json()
            if (onSuccess) {
              onSuccess(data)
            }
          }
        ) */
    var user = {
      "id": "fake-id",
      "fullName": "Trần Thiện Khiêm",
      "profilePicture": "http://graph.facebook.com/718933983/picture?type=square"
    }

    onSuccess(user)
  }
}