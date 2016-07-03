import { Http, Headers, RequestOptions } from '@angular/http'
import { Injectable } from '@angular/core'
import { User } from './data'


@Injectable()
export class UserService {

  /// constructor of the user service
  constructor(private http: Http) {
  }

  /// login by facebook
  loginByFacebook(accessToken: string, onSuccess: Function) {

    this.http.post("/api/user/fbLogin", accessToken)
        .subscribe(
          response => {
            var data = response.json()
            if (onSuccess) {
              onSuccess(data)
            }
          }
        )
  }
}
