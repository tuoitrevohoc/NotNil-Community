import { bootstrap }    from '@angular/platform-browser-dynamic'
import { ApplicationComponent } from './application.component'
import { Http, ConnectionBackend, HTTP_PROVIDERS, BaseRequestOptions, RequestOptions, Headers } from '@angular/http'
import { ROUTER_PROVIDERS } from '@angular/router'
import { provide } from '@angular/core'


/// real import
import { FacebookConnect } from './services/facebook-connect'
import { UserService } from './services/user-service'
import { FeedService } from './services/feed-service'
import { ChallengeService } from './services/challenge-service'
import { GlobalService } from './services/global-service'

class HttpOptions extends BaseRequestOptions {
  headers = new Headers({ 'Content-Type': 'application/json' })
  url = "http://notnil.com:8080/"
}

bootstrap(ApplicationComponent, 
              [
                Http, 
                ConnectionBackend, 
                HTTP_PROVIDERS, 
                FacebookConnect,
                FeedService,
                UserService,
                ChallengeService,
                GlobalService,
                ROUTER_PROVIDERS ,
                provide(RequestOptions, {useClass: HttpOptions})
              ])