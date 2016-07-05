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

  shareUrl = null
  loading = false
  connected = false
  update = true

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
  }

  startPlaying(code) {
    if (!this.loading) {
      this.loading = true
      this.playgroundService.play(code)
          .subscribe((data) => {
            this.output.setCode(data.text())
            this.playgroundService.send(new Message("updateOuput", data.text()))

            this.codeEditor.focus()
            this.loading = false
          }, () => this.loading = false )
    }
  }

  startSharing() {
    this.playgroundService.create((message) => this.onMessage(message))
  }

  // on message
  onMessage(message: Message) {
    if (message.action == "ok") {
      this.shareUrl = "http://" + window.location.host + "/play/" + message.content

      this.playgroundService.send(new Message("setCode", this.codeEditor.getCode()))
      this.connected = true
    } else if (message.action == "update") {
      var change = JSON.parse(message.content)
      this.update = false
      this.codeEditor.applyDelta(change)
      this.update = true
    } else if (message.action == "updateOuput") {
      this.output.setCode(message.content)
    } else if (message.action == "setCode") {
      this.codeEditor.setCode(message.content)
      this.connected = true
    }
  }

  // code change
  codeChange(change: any) {
    if (this.connected && this.update) {
      this.playgroundService.send(new Message("update", JSON.stringify(change)))
      this.playgroundService.send(new Message("setCode", this.codeEditor.getCode()))
    }
  }

}
