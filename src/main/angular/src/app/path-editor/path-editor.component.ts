import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { CodeEditorComponent } from '../code-editor'
import { Path } from '../services/data'
import { BaseComponent } from '../base.component'
import { GlobalService } from '../services/global.service'
import { MarkUpPipe } from '../pipes/mark-up.pipe'
import { ChallengeEditorComponent } from '../challenge-editor'

@Component({
  moduleId: module.id,
  selector: 'app-path-editor',
  templateUrl: 'path-editor.component.html',
  directives: [ROUTER_DIRECTIVES, CodeEditorComponent, ChallengeEditorComponent],
  pipes: [ MarkUpPipe ]
})
export class PathEditorComponent extends BaseComponent implements OnInit {

  private path: Path = {
    intro: `#A new path
Intro goes here...`,
    challenges: [],
    users: []
  } 

  constructor(globalService: GlobalService) {
    super(globalService)
  }

  ngOnInit() {
  }

  updateIntro(intro) {
    this.path.intro = intro
  }

  addChallenge() {
    this.path.challenges.push({
      definition: {
        input: [],
        output: {}
      }
    })
    console.log("Challenge Added!!")
  }

}
