import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { AnnouncerComponent } from './announcer'
import { LoginComponent } from './login'
import { FeedViewComponent } from './feed-view'
import { ChallengeEditorComponent } from './challenge-editor'


@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [AnnouncerComponent,  
          LoginComponent, 
          FeedViewComponent, 
          ChallengeEditorComponent,
          ROUTER_DIRECTIVES
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent {
}
