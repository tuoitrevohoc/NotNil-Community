import { OnInit, OnDestroy } from '@angular/core'

import { User } from './services/data'
import { GlobalService, Subscription } from './services/global.service'

/// export class BaseComponent
export class BaseComponent implements OnDestroy {

    currentUser: User

    subscription: Subscription

    // error message
    error: string

    // loading 
    loading: boolean = false

    constructor(public globalService: GlobalService) {
        this.currentUser = globalService.currentUser
        this.subscription = this.globalService.channel("login")
            .subcribe((user) => this.currentUser = user)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}