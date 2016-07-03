import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Challenge } from '../services/data'
import { ChallengeService } from '../services/challenge.service'

import { ErrorComponent } from '../error'
import { ChallengeViewComponent } from '../challenge-view'


@Component({
  moduleId: module.id,
  selector: 'app-challenge-page',
  templateUrl: 'challenge-page.component.html',
  directives: [ ErrorComponent, ChallengeViewComponent ]
})
export class ChallengePageComponent implements OnInit, OnDestroy {

  error: string

  challenge: Challenge

  subscription: any

  constructor(private activateRoute: ActivatedRoute,
              private challengeService: ChallengeService) {

  }

  ngOnInit() {
    this.subscription = this.activateRoute
                            .params
                            .subscribe(params => {
                              let id = params["id"]
                              this.loadChallenge(id)
                            })
  }

  // load challenge id
  loadChallenge(id: string) {
    this.challengeService.get(id)
        .subscribe((challenge) => {
          this.challenge = challenge.json()
          console.log(this.challenge)
        }, () => {
          this.error = "Challenge Not Found!!"
        })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
