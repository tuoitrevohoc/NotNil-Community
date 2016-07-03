import { bootstrap } from '@angular/platform-browser-dynamic'
import { enableProdMode, provide } from '@angular/core'
import { AppComponent, environment } from './app/'
import { FacebookConnectService } from './app/services/facebook-connect.service'
import { GlobalService } from './app/services/global.service'
import { UserService } from './app/services/user.service'
import { ChallengeService } from './app/services/challenge.service'
import { AppRoutes } from './app/app.routes'

import { Http, ConnectionBackend, HTTP_PROVIDERS, BaseRequestOptions, RequestOptions, Headers } from '@angular/http'


if (environment.production) {
  enableProdMode()
}

class HttpOptions extends BaseRequestOptions {
  headers = new Headers({ 'Content-Type': 'application/json' })
  url = "http://notnil.com:8080/"
}

bootstrap(AppComponent,
[
            Http, 
                ConnectionBackend, 
                HTTP_PROVIDERS, 
                FacebookConnectService,
                UserService,
                ChallengeService,
                GlobalService,
                provide(RequestOptions, {useClass: HttpOptions}),
                AppRoutes])

