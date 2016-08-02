import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'app-path-browser',
  templateUrl: 'path-browser.component.html',
  directives: [ROUTER_DIRECTIVES],
})
export class PathBrowserComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
