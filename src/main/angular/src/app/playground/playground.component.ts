import { Component, OnInit, ViewChild } from '@angular/core'
import { CodeEditorComponent } from '../code-editor'
import { PlayGroundService, Message } from '../services/playground.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'app-playground',
  templateUrl: 'playground.component.html',
  providers: [PlayGroundService],
  directives: [CodeEditorComponent]
})
export class PlaygroundComponent implements OnInit {

  @ViewChild("codeEditor") codeEditor: CodeEditorComponent
  @ViewChild("output") output: CodeEditorComponent

  shareUrl: string = null
  isOwner: boolean = false

  constructor(private playgroundService: PlayGroundService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.params
      .subscribe((params) => {
        var id = params["playId"]
        if (id) {
          this.playgroundService.subscribe(id,
            (message) => this.onMessage(message)
          )

          this.shareUrl = "http://" + window.location.host + "/play/" + id
        }
      })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.codeEditor.setCode("print(\"Hello Swift\")")
    if (this.shareUrl) {
      this.codeEditor.setReadOnly(true)
    }
  }

  startPlaying(code) {
    this.playgroundService.play(code)
        .subscribe((data) => {
          this.output.setCode(data.text())

          if (this.isOwner) {
            this.playgroundService.send(new Message("updateOuput", data.text()))
          }

          this.codeEditor.focus()
        })
  }

  startSharing() {
    this.playgroundService.create((message) => this.onMessage(message))
  }

  // on message
  onMessage(message: Message) {
    if (message.action == "ok") {
      this.shareUrl = "http://" + window.location.host + "/play/" + message.content
      this.isOwner = true
    } else if (message.action == "update") {
      this.codeEditor.setCode(message.content)
    } else if (message.action == "updateOuput") {
      this.output.setCode(message.content)
    }
  }

  // code change
  codeChange(code: string) {
    if (this.isOwner) {
      this.playgroundService.send(new Message("update", code))
    }
  }

}
