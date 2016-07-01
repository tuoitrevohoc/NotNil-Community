import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core'
import { Challenge, User, Reply, Solution } from './services/data'
import { LikeComponent } from './views/likes.component'
import { CodeEditorComponent } from './code-editor.component'
import { ChallengeService } from './services/challenge-service'
import { MarkUpPipe } from './pipes/mark-up.pipe'
import { DateTimePipe } from './pipes/date-time'
import { GlobalService } from './services/global-service'

@Component({
  moduleId: module.id,
  selector: 'challenge-component',
  templateUrl: 'challenge.component.html',
  directives: [LikeComponent, CodeEditorComponent],
  pipes: [ MarkUpPipe, DateTimePipe ]
})
export class ChallengeComponent implements OnInit, AfterViewInit {

  // the challege to display
  @Input() challenge: Challenge

  // reply with solution
  withSolution = false

  deleted = false

  // error message
  error: string

  // loading 
  loading: boolean = false

  // cache value
  values: string[] = []

  // the reply
  reply: Solution

  currentUser: User

  // code editor view child
  @ViewChild(CodeEditorComponent) codeEditor: CodeEditorComponent

  constructor(private challengeService: ChallengeService,
              private globalService: GlobalService) {
      this.globalService.channel("login").subcribe(
        (user) => this.currentUser = user
      )
  }

  ngOnInit() { 
    
  }

  // after the view is initialized
  ngAfterViewInit() {
    this.updateCodeEditor()
  }

  // update the code editor
  updateCodeEditor() {
    if (this.withSolution) {
      this.codeEditor.setMode("swift")
      var segments = (this.challenge.code || "").split(`*/`)
      var code = segments[segments.length - 1]
      this.codeEditor.setCode(this.values[this.withSolution?1:0] || code)
    } else {
      this.codeEditor.setMode("markdown")
      this.codeEditor.setCode(this.values[this.withSolution?1:0] || "")
    }
  }

  deleteChallenge() {
    this.challengeService.deleteChallenge(this.challenge)
      .subscribe(() =>{
        this.deleted = true
      })
  }

  // delete the reply
  deleteReply(reply: Reply) {
    this.challengeService.deleteReply(reply)
      .subscribe(() =>{
        reply["deleted"] = true
      })
  }

  // attach the solution
  attachSolutionChanged() {
    // save old values
    var value = this.codeEditor.getCode()
    this.values[this.withSolution?1:0] = value

    this.withSolution = !this.withSolution
    this.updateCodeEditor()
  }
  
  // on reply clicked
  replyClicked(submit: boolean = false) {
    var content = this.codeEditor.getCode()

    if (!this.withSolution) {  
      var reply: Reply = {}
      reply.content = content

      this.loading = true
      this.challengeService.addReply(this.challenge, reply)
          .subscribe((response) => {
                        this.challenge.replies.push(response.json())
                        this.loading = false
                        this.codeEditor.setCode("")
                      },
                      () => {
                        this.error = "Unable to post reply"
                        this.loading = false
                      })
      
    } else {
      var solution: Solution = {}
      solution.code = content
      this.challengeService.testSolution(this.challenge, solution, submit)
          .subscribe((response) => {

            this.reply = response.json()

            if (submit
                && this.reply
                && this.reply.result 
                && this.reply.result.tests
                && this.reply.result.tests.length > 0
                && this.reply.result.tests.every(i => i)
                && this.reply.result.hiddenTests.every(i => i)) {
                this.challenge.replies.push(this.reply)
                this.attachSolutionChanged()

                this.globalService.channel("gift-dialog")
                    .emit({
                      'title': "Congratulation",
                      'message': this.reply.reward ? 'You have earned ' + this.reply.reward + ' points!'
                                  : 'You have successfully submit a solution!'
                    })
            } else {
              this.error = this.reply.result.error
            }

            this.reply.result.passedTests = this.reply.result.tests.filter(i => i).length
            this.reply.result.passedHiddenTests = this.reply.result.hiddenTests.filter(i => i).length


            this.loading = false
          },
          () => {
              this.error = "Unable to post solution"
              this.loading = false
            })
    }
  }

}