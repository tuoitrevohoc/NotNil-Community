/// the facebook connect service
export class FacebookConnect {

  // initialize SDK
  initSDK(callBack: Function) {
    callBack()
  }

  // check login status
  getLoginStatus(response: (Function)) {
    response("fake-access-token")
  }

  // login
  login(response: Function) {
    response("fake-access-token")
  }

}