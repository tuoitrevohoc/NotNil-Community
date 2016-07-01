import { Component, OnInit, Input } from '@angular/core'
import { GlobalService } from '../services/global-service'
import { Http } from '@angular/http'
import { User } from '../services/data'

@Component({
  moduleId: module.id,
  selector: 'likes-component',
  templateUrl: 'likes.component.html'
})
export class LikeComponent implements OnInit {

  // list of users who like the post
  @Input() likes: User[]

  // url for post a like
  @Input() url: string

  active = false

  constructor(private globalService: GlobalService,
              private http: Http) { }

  ngOnInit() {
  }

  isLiked() {
    var userId = this.globalService.currentUser ? this.globalService.currentUser.id : 0
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