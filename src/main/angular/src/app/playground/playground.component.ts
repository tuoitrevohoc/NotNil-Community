import { Component, OnInit, ViewChild } from '@angular/core'
import { CodeEditorComponent } from '../code-editor'
import { PlayGroundService } from '../services/playground.service'

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

  constructor(private playgroundService: PlayGroundService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.codeEditor.setCode("print(\"Hello Swift\")")
  }

  startPlaying(code) {
    this.playgroundService.play(code)
        .subscribe((data) => {
          this.output.setCode(data.text())
          this.codeEditor.focus()
        })
  }

}
