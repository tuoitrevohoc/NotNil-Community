import { Component, OnInit, ViewChild } from '@angular/core'
import { CodeEditorComponent } from '../code-editor'

@Component({
  moduleId: module.id,
  selector: 'app-playground',
  templateUrl: 'playground.component.html',
  directives: [CodeEditorComponent]
})
export class PlaygroundComponent implements OnInit {

  @ViewChild("codeEditor") codeEditor: CodeEditorComponent
  @ViewChild("output") output: CodeEditorComponent

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.output.setCode("Output...")
  }

}
