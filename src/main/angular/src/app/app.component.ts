import { Component } from '@angular/core'
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
          ChallengeEditorComponent
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'app works!'
}
