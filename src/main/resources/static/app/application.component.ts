import { Component, OnInit } from '@angular/core'
import { CodeEditorComponent } from './code-editor.component'
import { AnnouncerComponent } from './announcer.component'
import { AppLoginComponent } from './app-login.component'
import { FeedComponent } from './feed.component'
import { NewChallengeComponent } from './new-challenge.component'
import { ROUTER_DIRECTIVES, Routes, ROUTER_PROVIDERS } from '@angular/router'
import { applicationRoutes } from './app.routes'


@Component({
    moduleId: module.id,
    selector: 'the-application',
    providers: [ ROUTER_PROVIDERS ],
    directives: [AnnouncerComponent, 
                        CodeEditorComponent, 
                        AppLoginComponent, 
                        FeedComponent, 
                        NewChallengeComponent, 
                        ROUTER_DIRECTIVES
                ],
    templateUrl: 'application.component.html'
})
export class ApplicationComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}