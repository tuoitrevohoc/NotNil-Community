import { Component, OnInit } from '@angular/core'

import { Challenge } from '../services/data'
import { ChallengeViewComponent } from '../challenge-view'
import { ChallengeEditorComponent } from '../challenge-editor'

import { ChallengeService } from '../services/challenge.service'
import { GlobalService } from '../services/global.service'

@Component({
  moduleId: module.id,
  selector: 'app-feed-view',
  templateUrl: 'feed-view.component.html',
  directives: [ ChallengeViewComponent, ChallengeEditorComponent ]
})
export class FeedViewComponent implements OnInit {

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
