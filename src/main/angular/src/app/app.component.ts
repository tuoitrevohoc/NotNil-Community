import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { AnnouncerComponent } from './announcer'
import { LoginComponent } from './login'
import { FeedViewComponent } from './feed-view'
import { ChallengeEditorComponent } from './challenge-editor'

import { Angulartics2 } from 'angulartics2'
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics'


@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [AnnouncerComponent,  
          LoginComponent, 
          FeedViewComponent, 
          ChallengeEditorComponent,
          ROUTER_DIRECTIVES
  ],
  providers: [Angulartics2GoogleAnalytics],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}
