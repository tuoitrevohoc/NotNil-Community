import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { GlobalService, Subscription } from '../services/global.service'
import { Http } from '@angular/http'
import { User } from '../services/data'

@Component({
  moduleId: module.id,
  selector: 'app-like-view',
  templateUrl: 'like-view.component.html'
})
export class LikeViewComponent implements OnInit {

    // list of users who like the post
  @Input() likes: User[]

  // url for post a like
  @Input() url: string

  active = false

  currentUser: User

  subscription: Subscription

  constructor(private globalService: GlobalService,
              private http: Http) { 
    this.subscription = globalService.channel("login").subcribe(
      (user) => this.currentUser = user
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  isLiked() {
    var userId = this.currentUser ? this.currentUser.id : 0
    return this.likes && this.likes.filter(like => like.id == userId).length > 0
  }

  // when click like data
  onLikeClicked() {
    this.http.post(this.url, null)
      .subscribe((data) => {
        if (data && data.json) {
          this.likes = data.json()
        }
      })
  }

}
