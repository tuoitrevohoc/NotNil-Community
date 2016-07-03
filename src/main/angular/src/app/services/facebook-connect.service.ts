import { Injectable } from '@angular/core';

declare var FB: any

@Injectable()
export class FacebookConnectService {

  constructor() {}

// initialize SDK
  initSDK(callBack: Function) {
    window['fbAsyncInit'] = () => {
        FB.init({
          appId      : '1727130914235954',
          xfbml      : false,
          version    : 'v2.6'
        });

        callBack();
        
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // check login status
  getLoginStatus(response: (Function)) {
    FB.getLoginStatus((data) => {
      if (data.authResponse && data.authResponse.accessToken) {
        response(data.authResponse.accessToken)
      }
    })
  }

  // login
  login(response: Function) {
    FB.login((data) => {
      console.log(data)
      response((data as any).authResponse.accessToken)
    })
  }
}
