import { ChallengeService } from './services/challenge-service'
import { Component, OnInit } from '@angular/core'
import { Challenge } from './services/data'
import { ChallengeComponent } from './challenge.component'
import { CodeEditorComponent } from './code-editor.component'
import { GlobalService } from './services/global-service'

@Component({
  moduleId: module.id,
  selector: 'new-feed',
  templateUrl: 'feed.component.html',
  directives: [ ChallengeComponent, CodeEditorComponent ]
})
export class FeedComponent implements OnInit {

  challenges: Challenge[]

  constructor(private challengeService: ChallengeService,
              private globalService: GlobalService) { }

  // load latests post on init
  ngOnInit() { 
    this.challengeService.getLatest().subscribe(
      (data) => this.challenges = data.json() as Challenge[]
    )

    this.globalService.channel("new-challenge")
      .subcribe((challenge) => {
        this.challenges.unshift(challenge)
      })
  }

}